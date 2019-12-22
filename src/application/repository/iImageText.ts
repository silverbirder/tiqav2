export abstract class IImageText {
    abstract async text(path: string): Promise<string>;
}