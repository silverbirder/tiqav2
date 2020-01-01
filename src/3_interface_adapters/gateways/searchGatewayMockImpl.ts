import {injectable} from 'inversify';
import {
    IHit,
    IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';

const hit: IHit = {
    url: 'http://example.com',
    quote: 'example',
    objectID: 1,
    tags: ['tag'],
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

    async search(id: number, text: string): Promise<Array<IHit>> {
        return new Promise(function (resolve) {
            resolve(hits);
        });
    }

    async save(object: IndexObject): Promise<number> {
        return new Promise(function (resolve) {
            resolve(hit.objectID);
        });
    }

    tags(id: number, keyword: string): Promise<Array<string>> {
        return new Promise(function (resolve) {
            resolve(['A', 'B']);
        });
    }
}