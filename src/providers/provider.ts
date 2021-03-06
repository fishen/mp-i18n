export interface IProvider {
    getSetData(p: any): (data: any, callback?: () => void) => void;
    request(params: { url: string }): Promise<{ data: any, statusCode: number, header: object }>;
    getStorageInfo(): Promise<{ keys: string[] }>;
    removeStorage(params: { key: string }): Promise<any>;
    setStorage(params: { key: string, data: any }): Promise<any>;
    getStorage(params: { key: string }): Promise<{ data: any }>;
    getStorageSync(key: string): any;
    getCurrentPages(): [{ route?: string, __route__?: string }];
}
