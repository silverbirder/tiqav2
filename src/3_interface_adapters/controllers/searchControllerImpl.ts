import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IController} from "../../2_application_business_rules/controllers/iController";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import SearchInputPortImpl from "../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl";

export const SEARCH_TYPES = {
    NORMAL: Symbol.for("NORMAL"),
    NEWEST: Symbol.for("NEWEST"),
    RANDOM: Symbol.for("RANDOM"),
};

@injectable()
export default class SearchControllerImpl implements IController {
    type: Symbol = SEARCH_TYPES.NORMAL;
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

    invoke(q: string): any {
        const inputPort: IInputPort<string> = new SearchInputPortImpl(q);
        let useCase: IUseCase = this._normalUseCase;
        switch (this.type) {
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
        return useCase.invoke(inputPort);
    }
}