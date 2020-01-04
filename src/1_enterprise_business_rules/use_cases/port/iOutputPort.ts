import {IPort, IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';

export interface IOutputPortFormat extends IPortFormat {
}

export interface IOutputPort<T> extends IPort<T> {
}