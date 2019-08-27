import { II18nConfigOptions } from "./config";
import { IProvider } from "./providers/provider";

export class I18nStore {
    private provider: IProvider;
    private prefix: string;
    private languageKey: string;
    constructor(config: II18nConfigOptions) {
        this.prefix = config.storageKeyPrefix;
        this.provider = config.provider;
        this.languageKey = config.languageStorageKey;
    }
    public get(path: string) {
        const key = this.getKey(path);
        return this.provider.getStorage({ key })
            .then((res) => res.data)
            .catch(() => null);
    }
    public set(path: string, data: any) {
        const key = this.getKey(path);
        return this.provider.setStorage({ key, data });
    }
    public has(path: string): Promise<boolean> {
        const key = this.getKey(path);
        return this.provider.getStorageInfo()
            .then((res) => res.keys.indexOf(key) >= 0)
            .catch(() => false);
    }
    public remove(path: string) {
        const key = this.getKey(path);
        return this.provider.removeStorage({ key });
    }
    public getAll() {
        if (!this.prefix) {
            return Promise.reject(new Error("missing i18n configuration option 'storageKeyPrefix'"));
        }
        return this.provider.getStorageInfo()
            .then((info) => info.keys)
            .then((keys) => keys.filter((key: string) => key.startsWith(this.prefix)));
    }
    public clear(data: object) {
        const from = this.getKey("").length;
        this.getAll()
            .then((keys) => keys.filter((key) => key !== this.languageKey && !(key.substr(from) in data)))
            .then((keys) => keys.forEach((key) => this.provider.removeStorage({ key })))
            .catch(console.error);
        return data;
    }
    private getKey(path: string) {
        return `${this.prefix}/${path}`;
    }
}
