import { IProvider } from "./providers/provider";
import { createProvider } from "./providers/provider-factory";

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

export const defaultConfig = {
    cachable: true,
    debug: false,
    lang: "zh_CN",
    langVar: "$lang",
    languageStorageKey: "i18n_language",
    provider: createProvider(),
    rememberLanguage: true,
    storageKeyPrefix: "i18n",
    tmplVar: "$t",
};
