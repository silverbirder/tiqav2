import {injectable} from 'inversify';

import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';

import {
    SearchOutputPortFormat,
    SearchOutputPortImpl
} from '@src/2_application_business_rules/use_cases/port/output/SearchOutputPortImpl';

@injectable()
export class SearchPresenterImpl implements IPresenter {
    view: {} = {};

    render(outputPort: SearchOutputPortImpl): void {
        const output: SearchOutputPortFormat = outputPort.get();
        this.view = output.results;
    }
}