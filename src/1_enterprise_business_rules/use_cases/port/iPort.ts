export interface IPortFormat {
}

export interface IPort<T> {
    get(): T;

    set(params: T): void;
}