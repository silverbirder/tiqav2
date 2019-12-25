export abstract class IImageTextGateway {
    abstract async text(path: string): Promise<string>;
}