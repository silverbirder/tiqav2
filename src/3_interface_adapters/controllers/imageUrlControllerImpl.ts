import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import SearchInputPortImpl from '../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl';

export const IMAGE_URL_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
};

export class ImageUrlControllerQuery implements IQuery {
    id: string = '';
    ext: string = '';
}

@injectable()
export default class ImageControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = IMAGE_URL_TYPES.NORMAL;
    query: IQuery = {};
    private readonly _normalUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchNormalUseCase) normalUseCase: IUseCase,
    ) {
        this._normalUseCase = normalUseCase;
        this.useCase = normalUseCase;
    }

    async invoke(query: ImageUrlControllerQuery): Promise<void> {
        let useCase: IUseCase = this._normalUseCase;
        let inputPort: IInputPort<IPortDataFormat> = new SearchInputPortImpl();
        inputPort.set({id: query.id});
        this.useCase = useCase;
        await useCase.invoke(inputPort);
        return;
    }
}