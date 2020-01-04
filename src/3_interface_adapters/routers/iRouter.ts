import {IRequest, IResponse} from '@src/2_application_business_rules/controllers/iController';

export interface IRouter {
    controllerType: Symbol;
    request: IRequest;
    response: IResponse;
    go(): Promise<void>;
}