import {IInputPort} from './port/iInputPort';
import {IPortDataFormat} from './port/iPort';

export interface IUseCase {
    invoke(i: IInputPort<IPortDataFormat>): any;
}