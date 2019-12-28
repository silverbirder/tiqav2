export interface IImageTextGateway {
    text(path: string): Promise<string>;
}