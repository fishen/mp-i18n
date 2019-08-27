import { II18nConfigOptions } from "./config";

export class Util {
    constructor(private config: II18nConfigOptions) { }
    public getCurrentPageRoute() {
        const pages = this.config.provider.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        return currentPage.route;
    }

    public request(url: string) {
        this.debug(`i18n request url: ${url}`);
        return this.config.provider.request({ url })
            .then((res: any) => (res.statusCode = res.statusCode || res.status, res))
            .then(({ statusCode, data }) => (statusCode === 200 ? data : Promise.reject(new Error(`Incorrent status code ${statusCode}`))))
            .then((data: any) => {
                if (typeof data === "object") {
                    return data;
                }
                return Promise.reject(new Error("invalid i18n config file, please check file contents."));
            })
            .catch((error) => (this.debug("request error:", error), Promise.reject(error)));
    }

    public debug(...args: any[]) {
        if (this.config.debug) {
            console.log(...args);
        }
    }

    public isFn(fn: any) {
        return typeof fn === "function";
    }
}
