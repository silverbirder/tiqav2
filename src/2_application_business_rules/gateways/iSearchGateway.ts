import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

export interface IHit extends IndexObject {
    objectID: string
}

export interface IndexObject {
    url: string,
    quote: string,
    tags: Array<string>,
    objectID?: string,
    updateDate: Date,
}

export interface ISearchGateway {
    search(id: string, keyword: string): Promise<Array<IHit>>;

    newest(): Promise<Array<IHit>>;

    random(): Promise<Array<IHit>>;

    tags(id: string, keyword: string): Promise<Array<string>>;

    save(object: IndexObject): Promise<string>;
}