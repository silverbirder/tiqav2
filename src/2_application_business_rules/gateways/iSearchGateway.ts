export interface ISearchResults {
    hits: any
}

export interface IImageObject {
    url: string,
    text: string
}

export interface ISearchGateway {
    search(text: string): Promise<ISearchResults>;
    save(objects: Array<IImageObject>): Promise<any>;
}