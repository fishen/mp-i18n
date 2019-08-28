import { IProvider } from "./provider";

// tslint:disable-next-line
declare var getCurrentPages;

export class DefaultProvider implements IProvider {
    protected provider: any;
    constructor(provider: any) {
        this.provider = provider;
    }
    public getSetData(p: any): (data: any, callback?: () => void) => void {
        if (p && typeof p.setData === "function") {
            return (data, callback) => p.setData(data, callback);
        } else if (p && typeof p.setState === "function") {
            return (data, callback) => p.setState(data, callback);
        }
    }
    public request(params: { url: string }) {
        const fn = this.provider && this.provider.request;
        return this.promisify(fn, params);
    }
    public getStorageInfo(): Promise<{ keys: string[]; }> {
        const fn = this.provider && this.provider.getStorageInfo;
        return this.promisify(fn);
    }
    public removeStorage(params: { key: string; }) {
        const fn = this.provider && this.provider.removeStorage;
        return this.promisify(fn, params);
    }
    public setStorage(params: { key: string; data: any; }): Promise<any> {
        const fn = this.provider && this.provider.setStorage;
        return this.promisify(fn, params);
    }
    public getStorage(params: { key: string; }): Promise<{ data: any; }> {
        const fn = this.provider && this.provider.getStorage;
        return this.promisify(fn, params);
    }
    public getStorageSync(key: string): any {
        const fn = this.provider && this.provider.getStorageSync;
        return fn(key);
    }
    public getCurrentPages(): [{ route: string; }] {
        let fn = this.provider && this.provider.getCurrentPages;
        fn = fn || getCurrentPages;
        return fn();
    }
    private promisify(fn, params?: object): Promise<any> {
        if (typeof fn !== "function") { throw new TypeError("Invalid provider type."); }
        params = Object.assign({}, params);
        return new Promise((success, fail) => fn({ ...params, success, fail }))
            .catch((err) => (console.log(err), Promise.reject(err)));
    }
}
