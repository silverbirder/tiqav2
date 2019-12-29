import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IController} from "../../2_application_business_rules/controllers/iController";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import SearchInputPortImpl from "../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl";

@injectable()
export default class SearchControllerImpl implements IController {
    private readonly _useCase: IUseCase;

    constructor(
        @inject(TYPES.SearchUseCase) useCase: IUseCase
    ) {
        this._useCase = useCase;
    }

    invoke(q: string): any {
        const inputPort: IInputPort<string> = new SearchInputPortImpl(q);
        return this._useCase.invoke(inputPort);
    }
}