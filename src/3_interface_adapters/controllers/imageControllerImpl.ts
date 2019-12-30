import {IController, IQuery} from "../../2_application_business_rules/controllers/iController";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import SearchInputPortImpl from "../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl";
import {IPortDataFormat} from "../../1_enterprise_business_rules/use_cases/port/iPort";

export const IMAGE_TYPES = {
    NORMAL: Symbol.for("NORMAL"),
    SAVE: Symbol.for("SAVE"),
};

export class ImageControllerQuery implements IQuery {
    id: string = "";
    url: string = "";
}

@injectable()
export default class ImageControllerImpl implements IController {
    useCaseType: Symbol = IMAGE_TYPES.NORMAL;
    query: IQuery = {};
    private readonly _normalUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchNormalUseCase) useCase: IUseCase,
    ) {
        this._normalUseCase = useCase;
    }

    invoke(query: ImageControllerQuery): any {
        let useCase: IUseCase = this._normalUseCase;
        let inputPort: IInputPort<IPortDataFormat> = new SearchInputPortImpl();
        inputPort.set({id: query.id});
        return useCase.invoke(inputPort);
    }
}