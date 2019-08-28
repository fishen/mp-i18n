declare module "mp-i18n/src/providers/provider" {
    export interface IProvider {
        getSetData(p: any): (data: any, callback?: () => void) => void;
        request(params: {
            url: string;
        }): Promise<{
            data: any;
            statusCode: number;
            header: object;
        }>;
        getStorageInfo(): Promise<{
            keys: string[];
        }>;
        removeStorage(params: {
            key: string;
        }): Promise<any>;
        setStorage(params: {
            key: string;
            data: any;
        }): Promise<any>;
        getStorage(params: {
            key: string;
        }): Promise<{
            data: any;
        }>;
        getStorageSync(key: string): any;
        getCurrentPages(): [{
            route: string;
        }];
    }
}
declare module "mp-i18n/src/providers/default-provider" {
    import { IProvider } from "mp-i18n/src/providers/provider";
    export class DefaultProvider implements IProvider {
        protected provider: any;
        constructor(provider: any);
        getSetData(p: any): (data: any, callback?: () => void) => void;
        request(params: {
            url: string;
        }): Promise<any>;
        getStorageInfo(): Promise<{
            keys: string[];
        }>;
        removeStorage(params: {
            key: string;
        }): Promise<any>;
        setStorage(params: {
            key: string;
            data: any;
        }): Promise<any>;
        getStorage(params: {
            key: string;
        }): Promise<{
            data: any;
        }>;
        getStorageSync(key: string): any;
        getCurrentPages(): [{
            route: string;
        }];
        private promisify;
    }
}
declare module "mp-i18n/src/providers/toutiao-provider" {
    import { DefaultProvider } from "mp-i18n/src/providers/default-provider";
    import { IProvider } from "mp-i18n/src/providers/provider";
    export class TTProvider extends DefaultProvider implements IProvider {
        getStorageSync(key: string): any;
    }
}
declare module "mp-i18n/src/providers/alipay-provider" {
    import { IProvider } from "mp-i18n/src/providers/provider";
    import { TTProvider } from "mp-i18n/src/providers/toutiao-provider";
    export class AliProvider extends TTProvider implements IProvider {
        request(params: {
            url: string;
        }): Promise<{
            data: any;
            statusCode: number;
            header: object;
        }>;
    }
}
declare module "mp-i18n/src/providers/provider-factory" {
    import { IProvider } from "mp-i18n/src/providers/provider";
    export function createProvider(): IProvider;
}
declare module "mp-i18n/src/config" {
    import { IProvider } from "mp-i18n/src/providers/provider";
    export interface II18nConfigOptions {
        /**
         * whether to enable cache, default is true.
         */
        cachable?: boolean;
        /**
         * whether to enable debug mode, default is false.
         */
        debug?: boolean;
        /**
         * the stroage key for keeping language user selected, it only works when setting 'rememberLanguage' to true.
         * default is 'i18n_language'
         */
        languageStorageKey?: string;
        /**
         * whether to remember the language selected by the user.
         */
        rememberLanguage?: boolean;
        /**
         * the api provider, it is automatically created from the current environment by default.
         */
        provider?: IProvider;
        /**
         * the key prefix for storage, default is 'i18n'.
         */
        storageKeyPrefix?: string;
        /**
         * initial language, default is 'zh_CN',
         * if the option 'rememberLanguage' is set to true, the rememberd language is preferred.
         */
        lang?: string;
        /**
         * texts file path factory function.
         */
        textsUrl: (hash: string, path: string) => string;
        /**
         * index file path factory function.
         */
        indexUrl: () => string;
        /**
         * variable name used in the template, default is '$t'.
         */
        tmplVar?: string;
        /**
         * current language variable name, default is '$lang'.
         */
        langVar?: string;
    }
    export const defaultConfig: {
        cachable: boolean;
        debug: boolean;
        lang: string;
        langVar: string;
        languageStorageKey: string;
        provider: IProvider;
        rememberLanguage: boolean;
        storageKeyPrefix: string;
        tmplVar: string;
    };
}
declare module "mp-i18n/src/store" {
    import { II18nConfigOptions } from "mp-i18n/src/config";
    export class I18nStore {
        private provider;
        private prefix;
        private languageKey;
        constructor(config: II18nConfigOptions);
        get(path: string): Promise<any>;
        set(path: string, data: any): Promise<any>;
        has(path: string): Promise<boolean>;
        remove(path: string): Promise<any>;
        getAll(): any;
        clear(data: object): object;
        private getKey;
    }
}
declare module "mp-i18n/src/util" {
    import { II18nConfigOptions } from "mp-i18n/src/config";
    export class Util {
        private config;
        constructor(config: II18nConfigOptions);
        getCurrentPageRoute(): string;
        request(url: string): Promise<any>;
        debug(...args: any[]): void;
        isFn(fn: any): boolean;
        isObj(obj: any): boolean;
        isStr(str: any): boolean;
    }
}
declare module "mp-i18n/src/i18n" {
    import { II18nConfigOptions } from "mp-i18n/src/config";
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
         * Variable name used in the template, default is '$t'.
         */
        tmplVar?: string;
        /**
         * Current language variable name, default is '$lang'.
         */
        langVar?: string;
    }
    export interface IFormatOptions {
        /**
         * The variable matching start symbol, default is '{'.
         */
        left?: string;
        /**
         * The variable matching end symbol, default is '}'.
         */
        right?: string;
        /**
         * The default value for formatting, default is ''.
         */
        defaultValue?: string | object;
    }
    export class I18n {
        /**
         * Get current language
         */
        /**
        * Set current language
        */
        language: string;
        constructor(options?: II18nConfigOptions);
        /**
         * Configure i18n options
         * @param options
         */
        config(options: II18nConfigOptions): void;
        /**
         * Get index resource.
         * @param options options.
         */
        getIndex(options?: {
            forced?: boolean;
        }): Promise<Record<string, any>>;
        /**
         * Get original i18n resources for the corresponding page or componet (default is current page).
         * @param options options.
         * @returns the original resources.
         *
         * @example
         * getTexts().then(console.log).catch(console.error);//{ zh:{ hello:"你好" },en:{ hello:"Hello" } }
         */
        getTexts(options?: II18nOptions): Promise<any>;
        /**
         * Load curennt language's resources and bind to the corresponding page or componet (default is current page).
         * @param thisArg page or component object.
         * @param options load options.
         * @returns the i18n resources.
         *
         * @example
         * //index.js
         * const {i18n}=require("mp-i18n");
         * Page({
         *  onLoad(){
         *    i18n.load(this)
         *  }
         * })
         *
         * //index.wxss
         * <view>{{$t.key}}</view>
         */
        load(thisArg: any, options?: II18nLoadOptions): Promise<any>;
        /**
         * Format a template string with the specified parameter.
         * @param template the template string.
         * @param params the parameter object to format template.
         * @param options formatting options, if the matching symbol(left and right) contains
         * special characters, please use the character '\' to escape, such as { left:"\\${" }.
         * @returns the formatting result.
         *
         * @example
         * format('hello, {world}!', { world:'fisher' }) //hello, fisher!
         * format('hello, {world}!', {},{ defaultValue:'world' }) //hello, world!
         * format('hello, ${world}!', { world:'fisher' }, { left:"\\${" }) //hello, fisher!
         */
        format(template: string, params: object, options?: IFormatOptions): string;
        /**
         * Merge texts by specified or current language.
         * @param data multi-language texts.
         * @param lang the specified language, default use current language.
         *
         * @example
         * mergetTexts({ zh:{ hi:'你好' },en:{ hi:'Hi' } },'en') //{ hi:'Hi' }
         */
        mergeTexts(data: any, lang?: string): any;
    }
}
declare module "mp-i18n" {
    import { I18n, IFormatOptions, II18nLoadOptions, II18nOptions } from "mp-i18n/src/i18n";
    const i18n: I18n;
    export { i18n, IFormatOptions, II18nLoadOptions, II18nOptions };
    export { IProvider } from "mp-i18n/src/providers/provider";
    export { DefaultProvider } from "mp-i18n/src/providers/default-provider";
}