export interface IHit extends IndexObject {
    objectID: number
}

export interface IndexObject {
    url: string,
    quote: string,
    tags: Array<string>,
    objectID?: number,
    updateDate: Date,
}

export interface ISearchGateway {
    search(id: number, keyword: string): Promise<Array<IHit>>;

    newest(): Promise<Array<IHit>>;

    random(): Promise<Array<IHit>>;

    tags(id: number, keyword: string): Promise<Array<string>>;

    save(object: IndexObject): Promise<number>;
}