import {container} from "@src/inversify.config";
import {TYPES} from "@src/types";
import {IUseCase} from "@src/1_enterprise_business_rules/use_cases/iUseCase";
import {ImageControllerImpl} from "@src/3_interface_adapters/controllers/imageControllerImpl";
import {IController} from "@src/2_application_business_rules/controllers/iController";

describe('run', () => {
    let controller: IController;
    beforeEach(() => {
        container.snapshot();
        container.rebind<IUseCase>(TYPES.SaveImageUseCase).to(SaveImageInteractorMock);
        container.rebind<IUseCase>(TYPES.GetImageUseCase).to(GetImageInteractorMock);
        const saveImageUseCase: IUseCase = container.get<IUseCase>(TYPES.SaveImageUseCase);
        const getImageUseCase: IUseCase = container.get<IUseCase>(TYPES.GetImageUseCase);
        controller = new ImageControllerImpl(saveImageUseCase, getImageUseCase);
    });
    afterEach(() => {
        container.restore();
    });
};