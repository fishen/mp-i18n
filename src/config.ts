import { IProvider } from "./providers/provider";
import { createProvider } from "./providers/provider-factory";

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
     * @deprecated
     */
    componentLifetime?: string;
    /**
     * the specified page's lifetime for loading i18n resources
     * @default onLoad
     * @deprecated
     */
    pageLifetime?: string;
}

export const defaultConfig = {
    cachable: true,
    componentLifetime: "attached",
    debug: false,
    lang: "zh_CN",
    langVar: "$lang",
    languageStorageKey: "i18n_language",
    pageLifetime: "onLoad",
    provider: createProvider(),
    rememberLanguage: true,
    storageKeyPrefix: "i18n",
    tmplVar: "$t",
};
