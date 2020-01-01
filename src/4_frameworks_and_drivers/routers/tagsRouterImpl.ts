import {IController, IRequest, IResponse} from '../../2_application_business_rules/controllers/iController';
import {container} from '../../inversify.config';
import {TYPES} from '../../types';
import {TAGS_TYPES} from '../../3_interface_adapters/controllers/tagsControllerImpl';
import IRouter from '../../3_interface_adapters/routers/iRouter';

export default class TagsRouterImpl implements IRouter{
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