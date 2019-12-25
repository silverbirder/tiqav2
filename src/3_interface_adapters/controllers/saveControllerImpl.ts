import {IController} from "../../2_application_business_rules/controllers/iController";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";

export default class SaveControllerImpl extends IController {
    useCase: IUseCase;
    constructor(useCase: IUseCase) {
        super();
        this.useCase = useCase;
    }
    invoke(url: string): any {
        return this.useCase.invoke(url);
    }
}