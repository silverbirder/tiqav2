import {inject, injectable} from 'inversify';
import {TYPES} from '@src/types';

import {IInputPort} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '@src/1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';
import {IUseCase} from '@src/1_enterprise_business_rules/use_cases/iUseCase';

import {ISearchGateway} from '@src/2_application_business_rules/gateways/iSearchGateway';
import {TagsInputPortFormat} from '@src/2_application_business_rules/use_cases/port/input/TagsInputPortImpl';
import {
    TagsOutputPortImpl,
    TagsSettableOutputPortFormat,
} from '@src/2_application_business_rules/use_cases/port/output/TagsOutputPortImpl';


@injectable()
export class SearchTagsInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.TagsPresenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<TagsInputPortFormat>): Promise<void> {
        const input: TagsInputPortFormat = inputPort.get();
        const tags: Array<string> = await this.searchGateWay.tags(input.id, input.keyword);
        const outPutPort: IOutputPort<IPortFormat> = new TagsOutputPortImpl();
        const settable: TagsSettableOutputPortFormat = {
            tags: tags,
        };
        outPutPort.set(settable);
        this.presenter.render(outPutPort);
        return;
    }
}