import {injectable} from 'inversify';
import {IUseCase} from "@src/1_enterprise_business_rules/use_cases/iUseCase";
import {IPresenter} from "@src/1_enterprise_business_rules/presenters/iPresenter";
import {IInputPort, IInputPortFormat} from "@src/1_enterprise_business_rules/use_cases/port/iInputPort";
import {PresenterMock} from "@src/3_interface_adapters/presenters/presenterMock";

@injectable()
export class SaveImageInteractorMock implements IUseCase {
    presenter: IPresenter;
    constructor(
    ) {
        this.presenter = new PresenterMock();
    }

    async invoke(i: IInputPort<IInputPortFormat>): Promise<void> {
        return;
    }
}