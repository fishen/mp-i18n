import { IProvider } from "./provider";
import { TTProvider } from "./toutiao-provider";

export class AliProvider extends TTProvider implements IProvider {
    public request(params: { url: string }): Promise<{ data: any, statusCode: number, header: object }> {
        return super.request(params)
            .then((res) => (res.statusCode = res.status, res));
    }
}
