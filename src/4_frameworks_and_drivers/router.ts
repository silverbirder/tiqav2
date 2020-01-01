import 'reflect-metadata';

import express, {Request, Response, Router} from 'express';

const router: Router = express.Router();

import SearchRouterImpl from './routers/searchRouterImpl';
import {CustomRequest} from './schema';
import {SEARCH_TYPES} from '../3_interface_adapters/controllers/searchControllerImpl';
import {IRequest} from '../2_application_business_rules/controllers/iController';
import ImageRouterImpl from './routers/imageRouterImpl';
import {IMAGE_TYPES} from '../3_interface_adapters/controllers/imageControllerImpl';
import TagsRouterImpl from './routers/tagsRouterImpl';
import IRouter from '../3_interface_adapters/routers/iRouter';


router.get('/images.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new ImageRouterImpl(customRequest, res);
    await customRouter.go();
});
router.get('/images/:id.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new SearchRouterImpl(customRequest, res);
    await customRouter.go();
});
router.get('/images/:id/tags.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new TagsRouterImpl(customRequest, res);
    await customRouter.go();
});
router.get('/search.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new SearchRouterImpl(customRequest, res);
    await customRouter.go();
});
router.get('/search/newest.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new SearchRouterImpl(customRequest, res);
    customRouter.controllerType = SEARCH_TYPES.NEWEST;
    await customRouter.go();
});
router.get('/search/random.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new SearchRouterImpl(customRequest, res);
    customRouter.controllerType = SEARCH_TYPES.RANDOM;
    await customRouter.go();
});
router.get('/tags.json', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new TagsRouterImpl(customRequest, res);
    await customRouter.go();
});
router.get('/:id.:ext', async (req: Request, res: Response) => {
    const customRequest: IRequest = new CustomRequest(req.params, req.query);
    const customRouter: IRouter = new ImageRouterImpl(customRequest, res);
    customRouter.controllerType = IMAGE_TYPES.VIEW;
    await customRouter.go();
});

export default router