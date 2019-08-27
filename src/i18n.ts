import { defaultConfig, II18nConfigOptions } from "./config";
import { I18nStore } from "./store";
import { Util } from "./util";

interface II18nOptions {
    /**
     * The resource(page or component) path, default get current path by 'getCurrentPages'.
     */
    path?: string;
    /**
     * local texts resource, if not set, it will fetch from the remote.
     */
    texts?: Record<string, any>;
}

let config: II18nConfigOptions;
let store: I18nStore;
let util: Util;
let userLanguage: string;

export class I18n {

    /**
     * Get current language
     */
    get language() {
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
    }

    /**
     * Set current language
     */
    set language(lang: string) {
        config.lang = lang;
        const { rememberLanguage, languageStorageKey, provider } = config;
        if (rememberLanguage && languageStorageKey) {
            userLanguage = lang;
            provider.setStorage({ key: languageStorageKey, data: lang });
        }
    }

    constructor(options?: II18nConfigOptions) {
        this.config(options);
    }

    /**
     * Configure i18n options
     * @param options
     */
    public config(options: II18nConfigOptions) {
        config = Object.assign(defaultConfig, options);
        store = new I18nStore(config);
        util = new Util(config);
        util.debug("Current i18n config:", config);
    }

    /**
     * Get index resource.
     */
    public getIndex(force?: boolean): Promise<Record<string, any>> {
        const { indexUrl, cachable } = config;
        if (!cachable || force) {
            if (!util.isFn(indexUrl)) { throw new Error("Please configure the 'indexUrl' option first."); }
            const url = indexUrl();
            if (this.getIndex.prototype.promise) { return this.getIndex.prototype.promise; }
            util.debug("Getting index resource from remote");
            const clear = () => this.getIndex.prototype.promise = undefined;
            const promise = util.request(url)
                .then((data) => store.clear(data))
                .then((data) => (clear(), data), (error) => (clear(), Promise.reject(error)));
            return this.getIndex.prototype.promise = promise;
        } else {
            util.debug("Trying get index resource from local");
            return Promise.resolve(this.getIndex.prototype.data)
                .then((data) => data || this.getIndex(true))
                .then((data) => this.getIndex.prototype.data = data);
        }
    }

    /**
     * Get text resources
     * @param options options
     */
    public getTexts(options: II18nOptions = {}): Promise<any> {
        const { texts } = options;
        if (texts) {
            util.debug("Use local texts", texts);
            return Promise.resolve(this.mergeTexts(texts));
        }
        const { textsUrl, cachable } = config;
        if (!util.isFn(textsUrl)) { throw new Error("Please configure the 'textsUrl' option first."); }
        const path = options.path || util.getCurrentPageRoute();
        util.debug(`Current i18n path is ${path}`);
        if (typeof path !== "string") { throw new TypeError("The path must be string type."); }
        return this.getIndex()
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
            })
            .then((t) => this.mergeTexts(t));
    }

    /**
     * Merge texts
     * @param data multi-language texts
     * @param lang language
     *
     * mergetTexts({zh:{hi:'你好'},en:{hi:'Hi'}},'en')
     * result: {hi:'Hi'}
     */
    public mergeTexts(data: any, lang?: string) {
        if (!data) { return {}; }
        const language = lang || this.language;
        if (!(language in data)) {
            util.debug(`The resource corresponding to ${language} does not exist.`, data);
        }
        return data[language];
    }
}
