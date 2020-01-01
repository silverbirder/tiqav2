import {IController, IRequest, IResponse} from '../../2_application_business_rules/controllers/iController';
import {TYPES} from '../../types';
import {container} from '../../inversify.config';
import IRouter from '../../3_interface_adapters/routers/iRouter';
import {IMAGE_URL_TYPES} from '../../3_interface_adapters/controllers/imageUrlControllerImpl';

export default class ImageUrlRouterImpl implements IRouter{
    controllerType: Symbol;
    request: IRequest;
    response: IResponse;

    constructor(request: IRequest, response: IResponse) {
        this.controllerType = IMAGE_URL_TYPES.NORMAL;
        this.request = request;
        this.response = response;
    }

    async go(): Promise<void> {
        const controller: IController = container.get<IController>(TYPES.ImageUrlController);
        controller.useCaseType = this.controllerType;
        await controller.run(this.request);
        this.response.writeHead(200, {'Content-Type': 'image/png'});
        this.response.end(controller.useCase.presenter.view.binary);
        return;
    }
}