import {injectable} from "inversify";
import {IImageGateway} from "../../2_application_business_rules/gateways/iImageGateway";

@injectable()
export class ImageGatewayMockImpl implements IImageGateway {
    async save(path: string): Promise<string> {
        return new Promise(function (resolve) {
            resolve(path);
        });
    }
}