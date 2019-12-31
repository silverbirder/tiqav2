import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';

export interface IQuery {
}

export interface IController {
    useCase: IUseCase;
    useCaseType: Symbol;
    query: IQuery;

    run(q: IQuery): Promise<void>;
}