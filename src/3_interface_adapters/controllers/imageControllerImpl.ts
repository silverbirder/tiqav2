import {IController, IRequest} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageInputPortImpl from '../../2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

export const IMAGE_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
    SAVE: Symbol.for('SAVE'),
};


@injectable()
export default class ImageControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_TYPES.NORMAL;
    private readonly _normalUseCase: IUseCase;
    private readonly _saveUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchNormalUseCase) normalUseCase: IUseCase,
        @inject(TYPES.SaveImageUseCase) saveUseCase: IUseCase,
    ) {
        this._normalUseCase = normalUseCase;
        this._saveUseCase = saveUseCase;
        this.useCase = normalUseCase;
    }

    async run(request: IRequest): Promise<void> {
        if(this.useCaseType === IMAGE_TYPES.SAVE) {
            this.useCase = this._saveUseCase;
        }
        const inputPort: IInputPort<IInputPortFormat> = new ImageInputPortImpl();
        inputPort.set(request);
        await this.useCase.invoke(inputPort);
        return;
    }
}