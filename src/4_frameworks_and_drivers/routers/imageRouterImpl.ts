import {IController, IRequest, IResponse} from '../../2_application_business_rules/controllers/iController';
import {container} from '../../inversify.config';
import {TYPES} from '../../types';
import {IMAGE_TYPES} from '../../3_interface_adapters/controllers/imageControllerImpl';
import IRouter from '../../3_interface_adapters/routers/iRouter';

export default class ImageRouterImpl implements IRouter {
    controllerType: Symbol;
    request: IRequest;
    response: IResponse;

    constructor(request: IRequest, response: IResponse) {
        this.controllerType = IMAGE_TYPES.SAVE;
        this.request = request;
        this.response = response;
    }

    async go(): Promise<void> {
        const controller: IController = container.get<IController>(TYPES.ImageController);
        controller.useCaseType = this.controllerType;
        await controller.run(this.request);
        this.response.send(controller.useCase.presenter.view);
    }
}