import {IPresenter} from "@src/1_enterprise_business_rules/presenters/iPresenter";
import {IOutputPort} from "@src/1_enterprise_business_rules/use_cases/port/iOutputPort";
import {IPortFormat} from "@src/1_enterprise_business_rules/use_cases/port/iPort";

export class PresenterMock implements IPresenter {
    view: {} = {};

    render(outPutPort: IOutputPort<IPortFormat>): void {
        this.view = {result: 'mock'};
    }
}