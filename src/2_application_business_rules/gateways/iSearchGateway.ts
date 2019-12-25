export interface ISearchResults {
    hits: any
}

export interface IImageObject {
    url: string,
    text: string
}

export abstract class ISearchGateway {
    abstract async search(text: string): Promise<ISearchResults>;

    abstract async save(objects: Array<IImageObject>): Promise<any>;
}