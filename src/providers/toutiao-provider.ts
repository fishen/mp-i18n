import { DefaultProvider } from "./default-provider";
import { IProvider } from "./provider";

export class TTProvider extends DefaultProvider implements IProvider {
    public getStorageSync(key: string) {
        return super.getStorageSync(key).data;
    }
}
