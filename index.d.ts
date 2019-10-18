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
         * whether to enable cache,
         * @default true.
         */
        cachable?: boolean;
        /**
         * whether to enable debug mode
         * @default false.
         */
        debug?: boolean;
        /**
         * the stroage key for keeping language user selected, it only works when setting 'rememberLanguage' to true.
         * @default 'i18n_language'
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
         * the key prefix for storage
         * @default 'i18n'
         */
        storageKeyPrefix?: string;
        /**
         * initial language
         * if the option 'rememberLanguage' is set to true, the rememberd language is preferred.
         * @default 'zh_CN'
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
         * variable name used in the template
         * @default '$t'.
         */
        tmplVar?: string;
        /**
         * current language variable name
         * @default '$lang'.
         */
        langVar?: string;
        /**
         * the specified component's lifetime for loading i18n resources
         * @default attached
         */
        componentLifetime?: string;
        /**
         * the specified page's lifetime for loading i18n resources
         * @default onLoad
         */
        pageLifetime?: string;
    }
    export const defaultConfig: {
        cachable: boolean;
        componentLifetime: string;
        debug: boolean;
        lang: string;
        langVar: string;
        languageStorageKey: string;
        pageLifetime: string;
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
    export function i18n(options?: II18nLoadOptions): any;
    export namespace i18n {
        var getLanguage: () => string;
        var setLanguage: (lang: string) => void;
        var config: (options: II18nConfigOptions) => void;
        var getIndex: (options?: {
            forced?: boolean;
        }) => Promise<Record<string, any>>;
        var getTexts: (options?: II18nOptions) => Promise<any>;
        var load: (thisArg: any, options?: II18nLoadOptions) => Promise<any>;
        var format: (template: string, params: object, options?: IFormatOptions) => string;
        var mergeTexts: (data: any, lang?: string) => any;
    }
}
declare module "mp-i18n" {
    import { i18n, IFormatOptions, II18nLoadOptions, II18nOptions } from "mp-i18n/src/i18n";
    export { i18n, IFormatOptions, II18nLoadOptions, II18nOptions };
    export { IProvider } from "mp-i18n/src/providers/provider";
    export { DefaultProvider } from "mp-i18n/src/providers/default-provider";
}