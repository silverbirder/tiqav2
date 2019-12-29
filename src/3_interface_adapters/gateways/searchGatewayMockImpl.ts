import {injectable} from "inversify";
import {
    IHit,
    IImageObject,
    ISearchGateway,
} from "../../2_application_business_rules/gateways/iSearchGateway";

@injectable()
export class SearchGatewayMockImpl implements ISearchGateway {
    constructor() {
    }
    async search(text: string): Promise<Array<IHit>> {
        return new Promise(function(resolve) {
            const hit: IHit = {
                "url": "http://example.com",
                "text": "example",
                "objectID": "A"
            };
            resolve(Array(hit));
        });
    }
    async save(objects: Array<IImageObject>): Promise<any> {
        return new Promise(function(resolve) {
            resolve(objects);
        });
    }
}