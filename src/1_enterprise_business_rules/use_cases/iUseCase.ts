import {IInputPort} from "./port/iInputPort";

export interface IUseCase {
    invoke(i: IInputPort<string>): any;
}