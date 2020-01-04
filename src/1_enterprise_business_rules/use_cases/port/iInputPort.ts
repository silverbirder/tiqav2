import {IPort, IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';

export interface IInputPortFormat extends IPortFormat {
}

export interface IInputPort<T> extends IPort<T> {
}