import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {injectable} from 'inversify';
import {
    ImageOutputPortImpl,
    ImageOutputPortFormat
} from '../../2_application_business_rules/use_cases/port/output/ImageOutputPortImpl';

@injectable()
export class ImagePresenterImpl implements IPresenter {
    view: {} = {};

    render(outputPort: ImageOutputPortImpl): void {
        const output: ImageOutputPortFormat = outputPort.get();
        this.view = output.binary;
    }
}