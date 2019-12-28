import {IOutputPort} from "../../1_enterprise_business_rules/use_cases/port/iOutputPort";

export interface IPresenter<T> {
    invoke(outPutPort: IOutputPort<T>): any;
}