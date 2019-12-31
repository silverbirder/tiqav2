import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import TagsInputPortImpl, {TagsSettableInputPortDataFormat} from '../../2_application_business_rules/use_cases/port/input/TagsInputPortImpl';

export const TAGS_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
};

export class TagsControllerQuery implements IQuery {
    id: string = '';
    q: string = '';
}

@injectable()
export default class TagsControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = TAGS_TYPES.NORMAL;
    query: IQuery = {};
    private readonly _normalUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchTagUseCase) normalUseCase: IUseCase,
    ) {
        this._normalUseCase = normalUseCase;
        this.useCase = normalUseCase;
    }

    async invoke(query: TagsControllerQuery): Promise<void> {
        const useCase: IUseCase = this._normalUseCase;
        const inputPort: IInputPort<IPortDataFormat> = new TagsInputPortImpl();
        const settable: TagsSettableInputPortDataFormat = new TagsSettableInputPortDataFormat();
        settable.id = query.id;
        settable.q = query.q;
        inputPort.set(settable);
        this.useCase = useCase;
        await useCase.invoke(inputPort);
        return;
    }
}