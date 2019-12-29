export interface IController {
    type: Symbol;
    invoke(i: string): any;
}