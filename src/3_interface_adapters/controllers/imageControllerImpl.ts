import {IController, IRequest} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageInputPortImpl from '../../2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

export const IMAGE_TYPES = {
    SAVE: Symbol.for('SAVE'),
};


@injectable()
export default class ImageControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_TYPES.SAVE;
    private readonly _saveUseCase: IUseCase;

    constructor(
        @inject(TYPES.SaveImageUseCase) saveUseCase: IUseCase,
    ) {
        this._saveUseCase = saveUseCase;
        this.useCase = saveUseCase;
    }

    async run(request: IRequest): Promise<void> {
        const inputPort: IInputPort<IInputPortFormat> = new ImageInputPortImpl();
        inputPort.set(request);
        await this.useCase.invoke(inputPort);
        return;
    }
}