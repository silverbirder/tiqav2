export abstract class IImage {
    abstract async save(path: string): Promise<string>;
}