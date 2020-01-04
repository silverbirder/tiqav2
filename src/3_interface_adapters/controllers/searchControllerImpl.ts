import {inject, injectable} from 'inversify';

import {TYPES} from '@src/types';

import {IInputPort, IInputPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';
import {IUseCase} from '@src/1_enterprise_business_rules/use_cases/iUseCase';

import {IController, IRequest} from '@src/2_application_business_rules/controllers/iController';
import {SearchInputPortImpl} from '@src/2_application_business_rules/use_cases/port/input/SearchInputPortImpl';


export const SEARCH_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
    NEWEST: Symbol.for('NEWEST'),
    RANDOM: Symbol.for('RANDOM'),
};


@injectable()
export class SearchControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = SEARCH_TYPES.NORMAL;
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
        this.useCase = normalUseCase;
    }

    async run(request: IRequest): Promise<void> {
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
        const inputPort: IInputPort<IInputPortFormat> = new SearchInputPortImpl();
        inputPort.set(request);
        this.useCase = useCase;
        await this.useCase.invoke(inputPort);
        return;
    }
}