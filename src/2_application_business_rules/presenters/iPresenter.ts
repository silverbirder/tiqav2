import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

export interface IPresenter {
    view: {
        binary?: string;
    }
    invoke(outPutPort: IOutputPort<IPortDataFormat>): void;
}