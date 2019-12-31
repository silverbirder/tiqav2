import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import ImageInputPortImpl, {
    ImageSettableInputPortFormat
} from '../../2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

export const IMAGE_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
    SAVE: Symbol.for('SAVE'),
};

export class ImageControllerQuery implements IQuery {
    id: string = '';
    url: string = '';
    tags: string = '';
    quote: string = '';
}

@injectable()
export default class ImageControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_TYPES.NORMAL;
    query: IQuery = {};
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

    async run(query: ImageControllerQuery): Promise<void> {
        let useCase: IUseCase = this._normalUseCase;
        let inputPort: IInputPort<IInputPortFormat> = new ImageInputPortImpl();
        let settable: ImageSettableInputPortFormat = new ImageSettableInputPortFormat();
        switch (this.useCaseType) {
            case IMAGE_TYPES.NORMAL:
                settable.id = query.id;
                inputPort.set(settable);
                break;
            case IMAGE_TYPES.SAVE:
                useCase = this._saveUseCase;
                settable.url = query.url;
                settable.tags = query.tags;
                settable.quote = query.quote;
                inputPort.set(settable);
                break;
        }
        this.useCase = useCase;
        await useCase.invoke(inputPort);
        return;
    }
}