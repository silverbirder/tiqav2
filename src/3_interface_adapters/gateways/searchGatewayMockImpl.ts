import {injectable} from 'inversify';
import {
    IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';
import {ImageEntityImpl} from '../../1_enterprise_business_rules/entities/imageEntityImpl';
import {container} from '../../inversify.config';
import {TYPES} from '../../types';
import {IDate} from '../../utils/date';

const entity: ImageEntityImpl = new ImageEntityImpl({
    url: 'http://example.com',
    quote: 'example',
    id: 1,
    tags: ['tag'],
    extension: [],
    updateDate: new Date('1994-02-14'),
}, container.get<IDate>(TYPES.DATE));
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