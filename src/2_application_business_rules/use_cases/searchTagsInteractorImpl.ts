import {ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '../presenters/iPresenter';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import {TagsInputPortDataFormat} from "./port/input/TagsInputPortImpl";
import TagsOutputPort, {TagsSettableOutputPortDataFormat} from "./port/output/TagsOutputPortImpl";


@injectable()
export default class SearchTagsInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<TagsInputPortDataFormat>): Promise<void> {
        const input: TagsInputPortDataFormat = inputPort.get();
        const tags: Array<string> = await this.searchGateWay.tags(input.id, input.keyword);
        const outPutPort: IOutputPort<IPortDataFormat> = new TagsOutputPort();
        const settable: TagsSettableOutputPortDataFormat = new TagsSettableOutputPortDataFormat();
        settable.tags = tags;
        outPutPort.set(settable);
        this.presenter.invoke(outPutPort);
    }
}