import {IInputPort} from './port/iInputPort';
import {IPortDataFormat} from './port/iPort';
import {IPresenter} from '../../2_application_business_rules/presenters/iPresenter';

export interface IUseCase{
    presenter: IPresenter;
    invoke(i: IInputPort<IPortDataFormat>): Promise<void>;
}