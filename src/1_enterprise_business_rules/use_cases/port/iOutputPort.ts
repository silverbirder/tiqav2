import {IPort, IPortFormat} from './iPort';

export interface IOutputPortFormat extends IPortFormat {
}

export interface IOutputPort<T> extends IPort<T> {
}