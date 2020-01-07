import {injectable} from 'inversify';

import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

import {IndexObject, ISearchGateway,} from '@src/2_application_business_rules/gateways/iSearchGateway';

const entity: ImageEntityImpl = new ImageEntityImpl({
    url: 'http://example.jpg',
    quote: 'example',
    id: 1,
    tags: ['tag'],
    extension: ['jpg'],
    updateDate: new Date('1994-02-14'),
});
const entities: Array<ImageEntityImpl> = Array(entity);

@injectable()
export class SearchGatewayMockImpl implements ISearchGateway {
    random(): Promise<Array<ImageEntityImpl>> {
        return new Promise(function (resolve) {
            resolve(entities);
        });
    }

    newest(): Promise<Array<ImageEntityImpl>> {
        return new Promise(function (resolve) {
            resolve(entities);
        });
    }

    constructor() {
    }

    async search(id: number, text: string): Promise<Array<ImageEntityImpl>> {
        return new Promise(function (resolve) {
            resolve(entities);
        });
    }

    async save(object: IndexObject): Promise<number> {
        return new Promise(function (resolve) {
            resolve(entity.id);
        });
    }

    tags(id: number, keyword: string): Promise<Array<string>> {
        return new Promise(function (resolve) {
            resolve(['A', 'B']);
        });
    }
}