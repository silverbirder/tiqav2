import {container} from '@src/inversify.config';
import {TYPES} from '@src/types';

import {IController, IRequest, IResponse} from '@src/2_application_business_rules/controllers/iController';

import {IMAGE_TYPES} from '@src/3_interface_adapters/controllers/imageControllerImpl';
import {IRouter} from '@src/3_interface_adapters/routers/iRouter';

export class ImageRouterImpl implements IRouter {
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
        if (this.controllerType == IMAGE_TYPES.VIEW) {
            this.response.writeHead(200, {'Content-Type': 'image/png'});
            this.response.end(controller.useCase.presenter.view);
        } else {
            this.response.send(controller.useCase.presenter.view);
        }
    }
}