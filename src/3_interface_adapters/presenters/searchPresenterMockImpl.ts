import {injectable} from 'inversify';

import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';

import {
    SearchOutputPortImpl
} from '@src/2_application_business_rules/use_cases/port/output/SearchOutputPortImpl';

@injectable()
export class SearchPresenterMockImpl implements IPresenter {
    view: {} = {};

    render(outputPort: SearchOutputPortImpl): void {
        this.view = 'binary';
    }
}