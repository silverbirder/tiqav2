export interface ISearchResults {
    hits: any
}
interface IImageObject {
    url: string,
    text: string
}
export abstract class ISearch {
    abstract async search(text: string): Promise<ISearchResults>;
    abstract async save(objects: Array<IImageObject>): Promise<any>;
}