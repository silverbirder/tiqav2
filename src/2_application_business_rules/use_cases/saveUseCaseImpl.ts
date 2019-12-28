import {IImageObject} from "../../2_application_business_rules/gateways/iSearchGateway";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IImageTextGateway} from "../gateways/iImageTextGateway";
import {IImageGateway} from "../gateways/iImageGateway";
import {ISearchGateway} from "../gateways/iSearchGateway";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
export default class SaveUseCaseImpl implements IUseCase {
    private imageTextGateWay: IImageTextGateway;
    private imageGateWay: IImageGateway;
    private searchGateWay: ISearchGateway;

    constructor(
        @inject(TYPES.ImageTextGateway) imageTextGateWay: IImageTextGateway,
        @inject(TYPES.ImageGateway) imageGateWay: IImageGateway,
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway) {
        this.imageTextGateWay = imageTextGateWay;
        this.imageGateWay = imageGateWay;
        this.searchGateWay = searchGateWay;
    }

    async invoke(url: string): Promise<any> {
        const text = await this.imageTextGateWay.text(url);
        const saved_url = await this.imageGateWay.save(url);
        const content: Array<IImageObject> = [{
            "url": saved_url,
            "text": text
        }];
        await this.searchGateWay.save(content);
    }
}