import "reflect-metadata";

import express, {Request, Response, Router} from 'express';
import SearchControllerImpl from '../3_interface_adapters/controllers/searchControllerImpl'
import SaveControllerImpl from '../3_interface_adapters/controllers/saveControllerImpl'
import {IController} from "../2_application_business_rules/controllers/iController";
import SearchUseCaseImpl from "../2_application_business_rules/use_cases/searchUseCaseImpl";
import {IUseCase} from "../1_enterprise_business_rules/use_cases/iUseCase";
import SaveUseCaseImpl from "../2_application_business_rules/use_cases/saveUseCaseImpl";
import {container} from "../inversify.config";
import {TYPES} from "../types";
import {IImageGateway} from "../2_application_business_rules/gateways/iImageGateway";
import {IImageTextGateway} from "../2_application_business_rules/gateways/iImageTextGateway";
import {ISearchGateway} from "../2_application_business_rules/gateways/iSearchGateway";
import {IPresenter} from "../2_application_business_rules/presenters/iPresenter";

const router: Router = express.Router();
router.get('/save', async (req: Request, res: Response) => {
    const imageGateway: IImageGateway = container.get<IImageGateway>(TYPES.ImageGateway);
    const imageTextGateway: IImageTextGateway = container.get<IImageTextGateway>(TYPES.ImageTextGateway);
    const searchGateway: ISearchGateway = container.get<ISearchGateway>(TYPES.SearchGateway);
    const useCase: IUseCase = new SaveUseCaseImpl(imageTextGateway, imageGateway, searchGateway);
    const controller: IController = new SaveControllerImpl(useCase);
    controller.invoke(req.query.url).then((v: any) => {
        res.send('end');
    });
});
router.get('/search', async (req: Request, res: Response) => {
    const searchGateway: ISearchGateway = container.get<ISearchGateway>(TYPES.SearchGateway);
    const presenter: IPresenter = container.get<IPresenter>(TYPES.Presenter);
    const useCase: IUseCase = new SearchUseCaseImpl(searchGateway, presenter);
    const controller: IController = new SearchControllerImpl(useCase);
    controller.invoke(req.query.q).then((v: any) => {
        res.send(v);
    });
});

export default router