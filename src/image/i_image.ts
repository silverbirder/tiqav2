export interface ISearchResults {
    hits: any
}
export abstract class IImage {
    abstract async save(path: string): Promise<void>;
    abstract async text(path: string): Promise<string>;
    abstract async search(text: string): Promise<ISearchResults>;
}