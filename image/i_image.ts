export abstract class IImage {
    abstract async save(path: string): Promise<void>;
    abstract async text(path: string): Promise<string>;
    abstract get(path: string): string;
    abstract async search(text: string): Promise<JSON>;
}