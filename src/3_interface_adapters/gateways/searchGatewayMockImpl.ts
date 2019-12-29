import {injectable} from "inversify";
import {
    IHit,
    IImageObject,
    ISearchGateway,
} from "../../2_application_business_rules/gateways/iSearchGateway";

const hit: IHit = {
    "url": "http://example.com",
    "text": "example",
    "objectID": "A"
};
const hits: Array<IHit> = Array(hit);

@injectable()
export class SearchGatewayMockImpl implements ISearchGateway {
    random(): Promise<Array<IHit>> {
        return new Promise(function (resolve) {
            resolve(hits);
        });
    }

    newest(): Promise<Array<IHit>> {
        return new Promise(function (resolve) {
            resolve(hits);
        });
    }

    constructor() {
    }

    async search(text: string): Promise<Array<IHit>> {
        return new Promise(function (resolve) {
            resolve(hits);
        });
    }

    async save(objects: Array<IImageObject>): Promise<any> {
        return new Promise(function (resolve) {
            resolve(objects);
        });
    }
}