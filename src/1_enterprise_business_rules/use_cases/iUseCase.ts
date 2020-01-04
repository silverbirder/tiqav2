import {IInputPort, IInputPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';

export interface IUseCase{
    presenter: IPresenter;
    invoke(i: IInputPort<IInputPortFormat>): Promise<void>;
}