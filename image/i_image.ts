export abstract class IImage {
    abstract async save(path: string): Promise<JSON>;
    abstract get(path: string): string;
}