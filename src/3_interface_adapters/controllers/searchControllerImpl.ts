import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IController} from "../../2_application_business_rules/controllers/iController";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
export default class SearchControllerImpl implements IController {
    useCase: IUseCase;

    constructor(
        @inject(TYPES.SearchUseCase) useCase: IUseCase
    ) {
        this.useCase = useCase;
    }

    invoke(q: any): any {
        return this.useCase.invoke(q);
    }
}