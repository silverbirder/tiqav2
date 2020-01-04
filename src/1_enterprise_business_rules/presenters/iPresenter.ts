import {IOutputPort} from '@src/1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';

export interface IPresenter {
    view: {}

    render(outPutPort: IOutputPort<IPortFormat>): void;
}