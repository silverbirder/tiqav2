export interface IImageGateway {
    supportExtension: Array<string>;
    save(path: string): Promise<string>;
}