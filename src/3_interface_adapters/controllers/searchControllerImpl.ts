import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import SearchInputPortImpl from '../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

export const SEARCH_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
    NEWEST: Symbol.for('NEWEST'),
    RANDOM: Symbol.for('RANDOM'),
};

export class SearchControllerQuery implements IQuery{
    q: string = '';
}

@injectable()
export default class SearchControllerImpl implements IController {
    useCaseType: Symbol = SEARCH_TYPES.NORMAL;
    query: IQuery = {};
    private readonly _normalUseCase: IUseCase;
    private readonly _newestUseCase: IUseCase;
    private readonly _randomUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchNormalUseCase) normalUseCase: IUseCase,
        @inject(TYPES.SearchNewestUseCase) newestUseCase: IUseCase,
        @inject(TYPES.SearchRandomUseCase) randomUseCase: IUseCase,
    ) {
        this._normalUseCase = normalUseCase;
        this._newestUseCase = newestUseCase;
        this._randomUseCase = randomUseCase;
    }

    invoke(query: SearchControllerQuery): any {
        let useCase: IUseCase = this._normalUseCase;
        switch (this.useCaseType) {
            case SEARCH_TYPES.NORMAL:
                useCase = this._normalUseCase;
                break;
            case SEARCH_TYPES.NEWEST:
                useCase = this._newestUseCase;
                break;
            case SEARCH_TYPES.RANDOM:
                useCase = this._randomUseCase;
                break;
        }
        const q: string = query.q;
        const inputPort: IInputPort<IPortDataFormat> = new SearchInputPortImpl();
        inputPort.set({q: q});
        return useCase.invoke(inputPort);
    }
}