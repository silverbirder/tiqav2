import {IController, IRequest} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageUrlInputPortImpl from '../../2_application_business_rules/use_cases/port/input/ImageUrlInputPortImpl';

export const IMAGE_URL_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
};

@injectable()
export default class ImageUrlControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_URL_TYPES.NORMAL;

    constructor(
        @inject(TYPES.GetImageBinaryUseCase) useCase: IUseCase,
    ) {
        this.useCase = useCase;
    }

    async run(request: IRequest): Promise<void> {
        const inputPort: IInputPort<IInputPortFormat> = new ImageUrlInputPortImpl();
        inputPort.set(request);
        await this.useCase.invoke(inputPort);
        return;
    }
}