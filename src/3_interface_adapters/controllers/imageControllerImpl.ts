import {IController, IRequest} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageInputPortImpl from '../../2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

export const IMAGE_TYPES = {
    SAVE: Symbol.for('SAVE'),
    VIEW: Symbol.for('VIEW'),
};


@injectable()
export default class ImageControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_TYPES.SAVE;
    private readonly _saveUseCase: IUseCase;
    private readonly _getImageUseCase: IUseCase;

    constructor(
        @inject(TYPES.SaveImageUseCase) saveUseCase: IUseCase,
        @inject(TYPES.GetImageUseCase) getImageUseCase: IUseCase,
    ) {
        this._saveUseCase = saveUseCase;
        this._getImageUseCase = getImageUseCase;
        this.useCase = saveUseCase;
    }

    async run(request: IRequest): Promise<void> {
        const inputPort: IInputPort<IInputPortFormat> = new ImageInputPortImpl();
        inputPort.set(request);
        if (this.useCaseType === IMAGE_TYPES.VIEW) {
            this.useCase = this._getImageUseCase;
        }
        await this.useCase.invoke(inputPort);
        return;
    }
}