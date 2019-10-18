import { defaultConfig, II18nConfigOptions } from "./config";
import { I18nStore } from "./store";
import { Util } from "./util";

export interface II18nOptions {
    /**
     * The resource(page or component) path, default get current path by 'getCurrentPages'.
     */
    path?: string;
    /**
     * Local texts resource, if not set, it will fetch from the remote.
     */
    texts?: Record<string, any>;
}

export interface II18nLoadOptions extends II18nOptions {
    /**
     * Variable name used in the template
     * @default '$t'
     */
    tmplVar?: string;
    /**
     * Current language variable name
     * @default '$lang'
     */
    langVar?: string;
    /**
     * Whether the current target is a component, used to decorate classes.
     */
    isComponent?: boolean;
    /**
     * Whether the current target is a page, used to decorate classes.
     */
    isPage?: boolean;
    /**
     * The specified lifetime for loading i18n resources, used to decorate classes.
     * @default 'attached' for component and 'onLoad' for page.
     */
    lifetime?: string;
}

export interface IFormatOptions {
    /**
     * The variable matching start symbol
     * @default '{'.
     */
    left?: string;
    /**
     * The variable matching end symbol
     * @default '}'.
     */
    right?: string;
    /**
     * The default value for formatting
     * @default ''.
     */
    defaultValue?: string | object;
}
export let config: II18nConfigOptions;
let store: I18nStore;
let util: Util;
let userLanguage: string;

export function i18n(options?: II18nLoadOptions): any {
    const decorator = function(target: any, name?: string, descriptor?: PropertyDescriptor) {
        if (typeof target === "function") {
            let lifetime = options.lifetime;
            lifetime = lifetime || options.isPage && config.pageLifetime;
            lifetime = lifetime || options.isComponent && config.componentLifetime;
            if (!lifetime) {
                console.warn("When Used to decorate class with 'i18n', please set 'isComponent' or 'isPage' option");
                return;
            }
            const originalValue = target.prototype[lifetime];
            target.prototype[lifetime] = function(...args: any[]) {
                return decorator.fn.call(this).finally(() => originalValue && originalValue.apply(this, args));
            };
        } else {
            const originalValue = descriptor.value;
            descriptor.value = function(...args: any[]) {
                return decorator.fn.call(this).finally(() => originalValue.apply(this, args));
            };
        }

    };
    decorator.fn = function() {
        return i18n.load(this, options);
    };
    return decorator;
}

/**
 * Get current language
 */
i18n.getLanguage = function(): string {
    const { rememberLanguage, languageStorageKey, provider } = config;
    if (rememberLanguage && languageStorageKey) {
        if (userLanguage) {
            return userLanguage;
        } else {
            const lang = provider.getStorageSync(config.languageStorageKey);
            if (lang) {
                return userLanguage = lang;
            }
        }
    }
    return config.lang;
};
/**
 * Set current language
 */
i18n.setLanguage = function(lang: string) {
    config.lang = lang;
    const { rememberLanguage, languageStorageKey, provider } = config;
    if (rememberLanguage && languageStorageKey) {
        userLanguage = lang;
        provider.setStorage({ key: languageStorageKey, data: lang });
    }
};
/**
 * Configure i18n options
 * @param options
 */
i18n.config = function(options: II18nConfigOptions) {
    config = Object.assign(defaultConfig, options);
    store = new I18nStore(config);
    util = new Util(config);
    util.debug("Current i18n config:", config);
};

/**
 * Get index resource.
 * @param options options.
 */
i18n.getIndex = function(options: { forced?: boolean } = {}): Promise<Record<string, any>> {
    const { indexUrl, cachable } = config;
    if (!cachable || options.forced) {
        if (!util.isFn(indexUrl)) { throw new Error("Please configure the 'indexUrl' option first."); }
        const url = indexUrl();
        if (i18n.getIndex.prototype.promise) { return i18n.getIndex.prototype.promise; }
        util.debug("Getting index resource from remote");
        const clear = () => i18n.getIndex.prototype.promise = undefined;
        const promise = util.request(url)
            .then((data) => store.clear(data))
            .then((data) => (clear(), data), (error) => (clear(), Promise.reject(error)));
        return i18n.getIndex.prototype.promise = promise;
    } else {
        util.debug("Trying get index resource from local");
        return Promise.resolve(i18n.getIndex.prototype.data)
            .then((data) => data || i18n.getIndex({ forced: true }))
            .then((data) => i18n.getIndex.prototype.data = data);
    }
};

/**
 * Get original i18n resources for the corresponding page or componet (default is current page).
 * @param options options.
 * @returns the original resources.
 *
 * @example
 * i18n.getTexts().then(console.log).catch(console.error);//{ zh:{ hello:"你好" },en:{ hello:"Hello" } }
 */
i18n.getTexts = function(options: II18nOptions = {}): Promise<any> {
    const { texts } = options;
    if (texts) {
        util.debug("Use local texts", texts);
        return Promise.resolve(texts);
    }
    const { textsUrl, cachable } = config;
    if (!util.isFn(textsUrl)) { throw new Error("Please configure the 'textsUrl' option first."); }
    const path = options.path || util.getCurrentPageRoute();
    util.debug(`Current i18n path is ${path}`);
    if (typeof path !== "string") { throw new TypeError("The path must be string type."); }
    return i18n.getIndex()
        .then((resources) => resources[path])
        .then((hash) => {
            if (!hash) {
                return Promise.reject(new Error(`The path '${path}' was not defined in index file.`));
            }
            const url = textsUrl(hash, path);
            if (cachable) {
                return store.get(path).then((data: any) => {
                    if (data && data.version === hash) {
                        util.debug(`Getting text resource from cache.`);
                        return data;
                    } else {
                        if (!data) {
                            util.debug(`The cache resource not exists and getting text resource from remote`);
                        } else {
                            store.remove(path);
                            util.debug(`The cache resource has expired.`);
                        }
                        return util.request(url)
                            .then((res: any) => (res.version = hash, res))
                            .then((t: any) => (store.set(path, t), t));
                    }

                });
            } else {
                util.debug(`Getting text resource from remote`);
                return util.request(url);
            }
        });
};

/**
 * Load curennt language's resources and bind to the corresponding page or componet (default is current page).
 * @param thisArg page or component object.
 * @param options load options.
 * @returns the i18n resources.
 *
 * @example
 * //index.js
 * const { i18n }=require("mp-i18n");
 * Page({
 *  onLoad(){
 *    i18n.load(this)
 *  }
 * })
 *
 * //index.wxss
 * <view>{{$t.key}}</view>
 */
i18n.load = function(thisArg: any, options: II18nLoadOptions = {}): Promise<any> {
    const setData = config.provider.getSetData(thisArg);
    if (!util.isFn(setData)) { throw new TypeError(`param 'thisArg' has no method 'setData'.`); }
    const tmplVar = options.tmplVar || config.tmplVar || defaultConfig.tmplVar;
    const langVar = options.langVar || config.langVar || defaultConfig.langVar;
    const getData = (texts) => ({ [tmplVar]: texts, [langVar]: i18n.getLanguage() });
    return i18n.getTexts(options)
        .then((t) => i18n.mergeTexts(t))
        .then((texts) => new Promise((resolve) => setData(getData(texts), () => resolve(texts))));
};

/**
 * Format a template string with the specified parameter.
 * @param template the template string.
 * @param params the parameter object to format template.
 * @param options formatting options, if the matching symbol(left and right) contains
 * special characters, please use the character '\' to escape, such as { left:"\\${" }.
 * @returns the formatting result.
 *
 * @example
 * i18n.format('hello, {world}!', { world:'fisher' }) //hello, fisher!
 * i18n.format('hello, {world}!', {},{ defaultValue:'world' }) //hello, world!
 * i18n.format('hello, ${world}!', { world:'fisher' }, { left:"\\${" }) //hello, fisher!
 */
i18n.format = function(template: string, params: object, options?: IFormatOptions): string {
    if (!template) { return template; }
    if (!util.isStr(template)) { throw new TypeError(`The param 'template' must be string type.`); }
    options = Object.assign({ left: "{", right: "}", defaultValue: "" }, options);
    const { left, right, defaultValue } = options;
    const regex = new RegExp(`${left}(.+?)${right}`, "g");
    const result = template.replace(regex, function(substr: string, key: string) {
        key = key.trim();
        let value = params && params[key];
        if (value === undefined && defaultValue !== undefined) {
            value = typeof defaultValue === "object" ? defaultValue[key] : defaultValue;
        }
        return value;
    });
    return result;
};

/**
 * Merge texts by specified or current language.
 * @param data multi-language texts.
 * @param lang the specified language, default use current language.
 *
 * @example
 * i18n.mergetTexts({ zh:{ hi:'你好' },en:{ hi:'Hi' } },'en') //{ hi:'Hi' }
 */
i18n.mergeTexts = function(data: any, lang?: string) {
    if (!data) { return {}; }
    const language = lang || i18n.getLanguage();
    if (!(language in data)) {
        util.debug(`The resource corresponding to ${language} does not exist.`, data);
    }
    return data[language];
};
