import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import ImageUrlInputPortImpl, {ImageUrlSettableInputPortDataFormat} from "../../2_application_business_rules/use_cases/port/input/ImageUrlInputPortImpl";

export const IMAGE_URL_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
};

export class ImageUrlControllerQuery implements IQuery {
    id: string = '';
    ext: string = '';
}

@injectable()
export default class ImageUrlControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_URL_TYPES.NORMAL;
    query: IQuery = {};

    constructor(
        @inject(TYPES.GetImageBinaryUseCase) useCase: IUseCase,
    ) {
        this.useCase = useCase;
    }

    async invoke(query: ImageUrlControllerQuery): Promise<void> {
        let inputPort: IInputPort<IPortDataFormat> = new ImageUrlInputPortImpl();
        let settable: ImageUrlSettableInputPortDataFormat = new ImageUrlSettableInputPortDataFormat();
        settable.id =   query.id;
        settable.ext = query.ext;
        inputPort.set(settable);
        await this.useCase.invoke(inputPort);
        return;
    }
}