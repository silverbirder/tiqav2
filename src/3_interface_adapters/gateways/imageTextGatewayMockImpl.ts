import {injectable} from "inversify";
import {IImageTextGateway} from "../../2_application_business_rules/gateways/iImageTextGateway";

@injectable()
export class ImageTextGatewayMockImpl implements IImageTextGateway {
    async text(path: string): Promise<string> {
        return new Promise(function (resolve) {
            resolve('text');
        });
    };
}