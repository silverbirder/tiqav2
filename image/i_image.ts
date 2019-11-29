export abstract class IImage {
    abstract async save(path: string): Promise<JSON>;
    abstract async text(path: string): Promise<string>;
    abstract get(path: string): string;
    abstract async search(text: string): Promise<JSON>;
}