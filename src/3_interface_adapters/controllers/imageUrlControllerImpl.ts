import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageUrlInputPortImpl, {ImageUrlSettableInputPortFormat} from '../../2_application_business_rules/use_cases/port/input/ImageUrlInputPortImpl';

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

    async run(query: ImageUrlControllerQuery): Promise<void> {
        let inputPort: IInputPort<IInputPortFormat> = new ImageUrlInputPortImpl();
        let settable: ImageUrlSettableInputPortFormat = new ImageUrlSettableInputPortFormat();
        settable.id =   query.id;
        settable.ext = query.ext;
        inputPort.set(settable);
        await this.useCase.invoke(inputPort);
        return;
    }
}