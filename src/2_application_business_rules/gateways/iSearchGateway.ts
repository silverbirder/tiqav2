import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

export interface IHit {
    url: string,
    text: string,
    objectID: string,
}

export interface IImageObject {
    url: string,
    text: string
}

export interface ISearchGateway {
    search(input: IPortDataFormat): Promise<Array<IHit>>;

    newest(): Promise<Array<IHit>>;

    random(): Promise<Array<IHit>>;

    save(objects: Array<IImageObject>): Promise<any>;
}