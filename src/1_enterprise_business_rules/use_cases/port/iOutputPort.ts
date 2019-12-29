import {IPort} from "./iPort";

export interface IOutputPort<T> extends IPort<T>{
    add(...v: string[]):void;
}