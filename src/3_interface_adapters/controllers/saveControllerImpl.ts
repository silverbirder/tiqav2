import {IController} from "../../2_application_business_rules/controllers/iController";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
export default class SaveControllerImpl implements IController {
    useCase: IUseCase;

    constructor(
        @inject(TYPES.SaveUseCase) useCase: IUseCase
    ) {
        this.useCase = useCase;
    }

    invoke(url: string): any {
        return this.useCase.invoke(url);
    }
}