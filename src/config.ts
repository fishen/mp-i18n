import { IProvider } from "./providers/provider";
import { createProvider } from "./providers/provider-factory";

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

export const defaultConfig = {
    cachable: true,
    debug: false,
    lang: "zh_CN",
    languageStorageKey: "i18n_language",
    provider: createProvider(),
    rememberLanguage: true,
    storageKeyPrefix: "i18n",
};
