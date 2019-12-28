import "reflect-metadata";

import express, {Request, Response, Router} from 'express';
import {IController} from "../2_application_business_rules/controllers/iController";
import {container} from "../inversify.config";
import {TYPES} from "../types";

const router: Router = express.Router();
router.get('/save', async (req: Request, res: Response) => {
    const controller: IController = container.get<IController>(TYPES.SaveController);
    controller.invoke(req.query.url).then((v: any) => {
        res.send('end');
    });
});
router.get('/search', async (req: Request, res: Response) => {
    const controller: IController = container.get<IController>(TYPES.SearchController);
    controller.invoke(req.query.q).then((v: any) => {
        res.send(v);
    });
});

export default router