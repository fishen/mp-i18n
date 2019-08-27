declare module "mp-i18n/src/providers/provider" {
    export interface IProvider {
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
         * Whether to use the cache, default is true.
         */
        cachable?: boolean;
        /**
         * Whether to enable debug mode, default is false.
         */
        debug?: boolean;
        /**
         * The stroage key for language user selected, it only works when setting 'rememberLanguage' to true.
         * default is 'i18n_language'
         */
        languageStorageKey?: string;
        /**
         * Whether to remember the language selected by the user.
         */
        rememberLanguage?: boolean;
        /**
         * The api provider, it is automatically created from the current environment by default.
         */
        provider?: IProvider;
        /**
         * The key prefix for storage.
         */
        storageKeyPrefix?: string;
        /**
         * Initial language, default is 'zh_CN'.
         */
        lang?: string;
        /**
         * Texts file path factory function.
         */
        textsUrl: (hash: string, path: string) => string;
        /**
         * Index file path factory function.
         */
        indexUrl: () => string;
    }
    export const defaultConfig: {
        cachable: boolean;
        debug: boolean;
        lang: string;
        languageStorageKey: string;
        provider: IProvider;
        rememberLanguage: boolean;
        storageKeyPrefix: string;
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
    }
}
declare module "mp-i18n/src/i18n" {
    import { II18nConfigOptions } from "mp-i18n/src/config";
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
         */
        getIndex(force?: boolean): Promise<Record<string, any>>;
        /**
         * Get text resources
         * @param options options
         */
        getTexts(options?: II18nOptions): Promise<any>;
        /**
         * Merge texts
         * @param data multi-language texts
         * @param lang language
         *
         * mergetTexts({zh:{hi:'你好'},en:{hi:'Hi'}},'en')
         * result: {hi:'Hi'}
         */
        mergeTexts(data: any, lang?: string): any;
    }
    export {};
}
declare module "mp-i18n" {
    import { I18n } from "mp-i18n/src/i18n";
    const i18n: I18n;
    export { i18n };
    export { IProvider } from "mp-i18n/src/providers/provider";
    export { DefaultProvider } from "mp-i18n/src/providers/default-provider";
}