import {IRequest, IResponse} from '../../2_application_business_rules/controllers/iController';

export default interface IRouter {
    controllerType: Symbol;
    request: IRequest;
    response: IResponse;
    go(): Promise<void>;
}