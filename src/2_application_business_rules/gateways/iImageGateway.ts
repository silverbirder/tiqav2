export abstract class IImageGateway {
    abstract async save(path: string): Promise<string>;
}