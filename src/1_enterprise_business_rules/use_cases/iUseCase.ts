import {IInputPort, IInputPortFormat} from './port/iInputPort';
import {IPresenter} from '../presenters/iPresenter';

export interface IUseCase{
    presenter: IPresenter;
    invoke(i: IInputPort<IInputPortFormat>): Promise<void>;
}