import {IController} from "../../2_application_business_rules/controllers/iController";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import SaveInputPortImpl from "../../2_application_business_rules/use_cases/port/input/SaveInputPortImpl";

@injectable()
export default class SaveControllerImpl implements IController {
    useCase: IUseCase;

    constructor(
        @inject(TYPES.SaveUseCase) useCase: IUseCase
    ) {
        this.useCase = useCase;
    }

    invoke(url: string): any {
        const inputPort: IInputPort<string> = new SaveInputPortImpl(url);
        return this.useCase.invoke(inputPort);
    }
}