export interface IImageGateway {
    save(path: string): Promise<string>;
}