import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IController, IRequest} from '../../2_application_business_rules/controllers/iController';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort, IInputPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {TagsInputPortImpl} from '../../2_application_business_rules/use_cases/port/input/TagsInputPortImpl';

export const TAGS_TYPES = {
    NORMAL: Symbol.for('NORMAL'),
};


@injectable()
export class TagsControllerImpl implements IController {
    useCase: IUseCase;
    useCaseType: Symbol = TAGS_TYPES.NORMAL;
    private readonly _normalUseCase: IUseCase;

    constructor(
        @inject(TYPES.SearchTagUseCase) normalUseCase: IUseCase,
    ) {
        this._normalUseCase = normalUseCase;
        this.useCase = normalUseCase;
    }

    async run(request: IRequest): Promise<void> {
        const inputPort: IInputPort<IInputPortFormat> = new TagsInputPortImpl();
        inputPort.set(request);
        await this.useCase.invoke(inputPort);
        return;
    }
}