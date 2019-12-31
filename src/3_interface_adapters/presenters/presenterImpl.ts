import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {injectable} from 'inversify';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';

@injectable()
export default class PresenterImpl<T> implements IPresenter {
    view: {} = {};
    render(outputPort: IOutputPort<T>): void {
        this.view = outputPort.get();
    }
}