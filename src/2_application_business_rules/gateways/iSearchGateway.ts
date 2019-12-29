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
    search(text: string): Promise<Array<IHit>>;

    newest(): Promise<Array<IHit>>;

    random(): Promise<Array<IHit>>;

    save(objects: Array<IImageObject>): Promise<any>;
}