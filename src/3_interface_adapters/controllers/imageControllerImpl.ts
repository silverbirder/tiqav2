import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import SearchInputPortImpl from '../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import ImageInputPortImpl from '../../2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

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
    }

    invoke(query: ImageControllerQuery): any {
        let useCase: IUseCase = this._normalUseCase;
        let inputPort: IInputPort<IPortDataFormat> = new SearchInputPortImpl();
        switch (this.useCaseType) {
            case IMAGE_TYPES.NORMAL:
                inputPort.set({id: query.id});
                break;
            case IMAGE_TYPES.SAVE:
                useCase = this._saveUseCase;
                inputPort = new ImageInputPortImpl();
                inputPort.set({url: query.url, tags: query.tags, quote: query.quote});
                break;
        }
        return useCase.invoke(inputPort);
    }
}