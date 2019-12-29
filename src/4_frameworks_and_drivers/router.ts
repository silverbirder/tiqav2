import "reflect-metadata";

import express, {Request, Response, Router} from 'express';
import {IController} from "../2_application_business_rules/controllers/iController";
import {container} from "../inversify.config";
import {TYPES} from "../types";
import {SEARCH_TYPES} from "../3_interface_adapters/controllers/searchControllerImpl";

const router: Router = express.Router();
router.get('/save', async (req: Request, res: Response) => {
    const controller: IController = container.get<IController>(TYPES.SaveController);
    controller.invoke(req.query.url).then((v: any) => {
        res.send('end');
    });
});

/*
/search.json
/search/newest.json
/search/random.json
*/
router.get(/search(\.json|\/(newest|random)\.json)/, async (req: Request, res: Response) => {
    let searchType: Symbol = SEARCH_TYPES.NORMAL;
    let keyword: string = '';
    if (req.path.match(/search\.json/)) {
        searchType = SEARCH_TYPES.NORMAL;
        keyword = req.query.q;
    } else if (req.path.match(/search\/newest\.json/)) {
        searchType = SEARCH_TYPES.NEWEST;
    } else if (req.path.match(/search\/random\.json/)) {
        searchType = SEARCH_TYPES.RANDOM;
    } else {
        res.send('NOT FOUND');
        return;
    }
    const controller: IController = container.get<IController>(TYPES.SearchController);
    controller.type = searchType;
    controller.invoke(keyword).then((v: any) => {
        res.send(v);
    });
});

export default router