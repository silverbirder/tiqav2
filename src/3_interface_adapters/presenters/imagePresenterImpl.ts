import {injectable} from 'inversify';

import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';

import {
    ImageOutputPortFormat,
    ImageOutputPortImpl
} from '@src/2_application_business_rules/use_cases/port/output/ImageOutputPortImpl';

@injectable()
export class ImagePresenterImpl implements IPresenter {
    view: {} = {};

    render(outputPort: ImageOutputPortImpl): void {
        const output: ImageOutputPortFormat = outputPort.get();
        this.view = output.binary;
    }
}