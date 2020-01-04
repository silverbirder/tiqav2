import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

// api response data.
export interface IHit extends IndexObject {
    objectID: number;
}

// will save the object.
export interface IndexObject {
    objectID?: number;
    url: string,
    quote: string,
    tags: Array<string>,
    extension: Array<string>,
    updateDate: Date,
}

export interface ISearchGateway {
    search(id: number, keyword: string, tags: Array<string>): Promise<Array<ImageEntityImpl>>;

    newest(): Promise<Array<ImageEntityImpl>>;

    random(): Promise<Array<ImageEntityImpl>>;

    tags(id: number, keyword: string): Promise<Array<string>>;

    save(object: IndexObject): Promise<number>;
}