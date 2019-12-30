import {injectable} from 'inversify';
import {
    IHit,
    IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';

const hit: IHit = {
    url: 'http://example.com',
    quote: 'example',
    objectID: 'A',
    updateDate: new Date('1994-02-14'),
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

    async save(object: IndexObject): Promise<string> {
        return new Promise(function (resolve) {
            resolve(hit.objectID);
        });
    }
}