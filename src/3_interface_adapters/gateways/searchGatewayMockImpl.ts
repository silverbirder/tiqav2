import {injectable} from "inversify";
import {IImageObject, ISearchGateway, ISearchResults} from "../../2_application_business_rules/gateways/iSearchGateway";

@injectable()
export class SearchGatewayMockImpl implements ISearchGateway {
    constructor() {
    }
    async search(text: string): Promise<ISearchResults> {
        return new Promise(function(resolve) {
            const results: ISearchResults = {
                "hits": 10
            };
            resolve(results);
        });
    }
    async save(objects: Array<IImageObject>): Promise<any> {
        return new Promise(function(resolve) {
            resolve(objects);
        });
    }
}