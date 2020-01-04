import {container} from '@src/inversify.config';
import {TYPES} from '@src/types';

import {IController, IRequest, IResponse} from '@src/2_application_business_rules/controllers/iController';

import {TAGS_TYPES} from '@src/3_interface_adapters/controllers/tagsControllerImpl';
import {IRouter} from '@src/3_interface_adapters/routers/iRouter';

export class TagsRouterImpl implements IRouter{
    controllerType: Symbol;
    request: IRequest;
    response: IResponse;

    constructor(request: IRequest, response: IResponse) {
        this.controllerType = TAGS_TYPES.NORMAL;
        this.request = request;
        this.response = response;
    }

    async go(): Promise<void>{
        const controller: IController = container.get<IController>(TYPES.TagsController);
        controller.useCaseType = this.controllerType;
        await controller.run(this.request);
        this.response.send(controller.useCase.presenter.view);
        return;
    }
}