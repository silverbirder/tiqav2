import express, {Request, Response, Router} from 'express';
import SearchControllerImpl from '../3_interface_adapters/controllers/searchControllerImpl'
import SaveControllerImpl from '../3_interface_adapters/controllers/saveControllerImpl'
import {IController} from "../2_application_business_rules/controllers/iController";
import SearchUseCaseImpl from "../2_application_business_rules/use_cases/searchUseCaseImpl";
import {IUseCase} from "../1_enterprise_business_rules/use_cases/iUseCase";
import {SearchGatewayImpl} from "../3_interface_adapters/gateways/searchGatewayImpl";
import SearchPresenterImpl from "../3_interface_adapters/presenters/searchPresenterImpl";
import SaveUseCaseImpl from "../2_application_business_rules/use_cases/saveUseCaseImpl";
import {ImageTextGatewayImpl} from "../3_interface_adapters/gateways/imageTextGatewayImpl";
import {ImageGatewayImpl} from "../3_interface_adapters/gateways/imageGatewayImpl";

const router: Router = express.Router();
router.get('/save', async (req: Request, res: Response) => {
    const useCase: IUseCase = new SaveUseCaseImpl(new ImageTextGatewayImpl(), new ImageGatewayImpl(), new SearchGatewayImpl());
    const controller: IController = new SaveControllerImpl(useCase);
    controller.invoke(req.query.url).then((v: any) => {
        res.send('end');
    });
});
router.get('/search', async (req: Request, res: Response) => {
    const useCase: IUseCase = new SearchUseCaseImpl(new SearchGatewayImpl(), new SearchPresenterImpl());
    const controller: IController = new SearchControllerImpl(useCase);
    controller.invoke(req.query.q).then((v: any) => {
        res.send(v);
    });
});

export default router