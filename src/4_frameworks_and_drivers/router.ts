import "reflect-metadata";

import express, {Request, Response, Router} from 'express';
import {IController} from "../2_application_business_rules/controllers/iController";
import {container} from "../inversify.config";
import {TYPES} from "../types";
import {SEARCH_TYPES, SearchControllerQuery} from "../3_interface_adapters/controllers/searchControllerImpl";
import {IMAGE_TYPES, ImageControllerQuery} from "../3_interface_adapters/controllers/imageControllerImpl";

const router: Router = express.Router();

/*
/images.json
/images/[id].json
 */
router.get(/images(\/\d+)?\.json$/, async (req: Request, res: Response) => {
    let controllerType: Symbol = IMAGE_TYPES.NORMAL;
    let query: ImageControllerQuery = new ImageControllerQuery();

    const saveMatch = new RegExp(/images\.json$/);
    const normalMatch = new RegExp(/images\/(\d+)\.json$/);
    let matched: RegExpMatchArray;

    if (req.path.match(saveMatch)) {
        controllerType = IMAGE_TYPES.SAVE;
        query.url = req.query.url;
    } else if (matched = req.path.match(normalMatch) || [], matched.length > 0) {
        controllerType = IMAGE_TYPES.NORMAL;
        const id: string = matched[1];
        query.id = id;
    }
    const controller: IController = container.get<IController>(TYPES.ImageController);
    controller.useCaseType = controllerType;
    controller.invoke(query).then((v: any) => {
        res.send(v);
    });
});

/*
/search.json
/search/newest.json
/search/random.json
 */
router.get(/search(\/(newest|random))?\.json/, async (req: Request, res: Response) => {
    let controllerType: Symbol = SEARCH_TYPES.NORMAL;
    let query: SearchControllerQuery = new SearchControllerQuery();
    const normalMatch = new RegExp(/search\.json/);
    const newestMatch = new RegExp(/search\/newest\.json$/);
    const randomMatch = new RegExp(/search\/random\.json$/);
    if (req.path.match(normalMatch)) {
        controllerType = SEARCH_TYPES.NORMAL;
        query.q = req.query.q;
    } else if (req.path.match(newestMatch)) {
        controllerType = SEARCH_TYPES.NEWEST;
    } else if (req.path.match(randomMatch)) {
        controllerType = SEARCH_TYPES.RANDOM;
    } else {
        res.send('NOT FOUND');
        return;
    }
    const controller: IController = container.get<IController>(TYPES.SearchController);
    controller.useCaseType = controllerType;
    controller.invoke(query).then((v: any) => {
        res.send(v);
    });
});

export default router