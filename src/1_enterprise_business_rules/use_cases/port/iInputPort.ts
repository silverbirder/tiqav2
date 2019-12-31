import {IPort, IPortFormat} from './iPort';

export interface IInputPortFormat extends IPortFormat {
}

export interface IInputPort<T> extends IPort<T> {
}