export interface IPortDataFormat {
}

export interface IPort<T> {
    data: IPortDataFormat;
    get():T;
    set(params: T): void;
}