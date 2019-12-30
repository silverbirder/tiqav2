export interface IPortDataFormat {
}

export interface IPort<T> {
    get():T;
    set(params: T): void;
}