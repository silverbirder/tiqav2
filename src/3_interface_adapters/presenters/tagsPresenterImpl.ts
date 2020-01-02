import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {injectable} from 'inversify';
import TagsOutputPortImpl, {TagsOutputPortFormat} from '../../2_application_business_rules/use_cases/port/output/TagsOutputPortImpl';

@injectable()
export default class TagsPresenterImpl implements IPresenter {
    view: {} = {};

    render(outputPort: TagsOutputPortImpl): void {
        const output: TagsOutputPortFormat = outputPort.get();
        this.view = output;
    }
}