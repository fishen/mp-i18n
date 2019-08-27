import { AliProvider } from "./alipay-provider";
import { DefaultProvider } from "./default-provider";
import { IProvider } from "./provider";
import { TTProvider } from "./toutiao-provider";

// tslint:disable
declare var wx, my, tt, swan;

export function createProvider(): IProvider {
    try {
        if (wx !== undefined) {
            return new DefaultProvider(wx);
        }
    } catch (error) { }
    try {
        if (my !== undefined) {
            return new AliProvider(my);
        }
    } catch (error) { }
    try {
        if (tt !== undefined) {
            return new TTProvider(tt);
        }
    } catch (error) { }
    try {
        if (swan !== undefined) {
            return new DefaultProvider(tt);
        }
    } catch (error) { }
}
