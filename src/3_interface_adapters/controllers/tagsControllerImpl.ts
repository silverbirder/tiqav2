import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IController, IQuery} from '../../2_application_business_rules/controllers/iController';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import TagsInputPortImpl, {TagsSettableInputPortFormat} from '../../2_application_business_rules/use_cases/port/input/TagsInputPortImpl';

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

    async run(query: TagsControllerQuery): Promise<void> {
        const useCase: IUseCase = this._normalUseCase;
        const inputPort: IInputPort<IInputPortFormat> = new TagsInputPortImpl();
        const settable: TagsSettableInputPortFormat = new TagsSettableInputPortFormat();
        settable.id = query.id;
        settable.q = query.q;
        inputPort.set(settable);
        this.useCase = useCase;
        await useCase.invoke(inputPort);
        return;
    }
}