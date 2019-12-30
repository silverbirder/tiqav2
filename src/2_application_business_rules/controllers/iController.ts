export interface IQuery {
}
export interface IController {
    useCaseType: Symbol;
    query: IQuery;
    invoke(q: IQuery): any;
}