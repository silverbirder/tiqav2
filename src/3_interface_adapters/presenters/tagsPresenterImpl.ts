import {injectable} from 'inversify';

import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';

import {
    TagsOutputPortFormat,
    TagsOutputPortImpl
} from '@src/2_application_business_rules/use_cases/port/output/TagsOutputPortImpl';

@injectable()
export class TagsPresenterImpl implements IPresenter {
    view: {} = {};

    render(outputPort: TagsOutputPortImpl): void {
        const output: TagsOutputPortFormat = outputPort.get();
        this.view = output;
    }
}