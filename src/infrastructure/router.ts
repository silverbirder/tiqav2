import express, {Request, Response, Router} from 'express';
import searchController from '../interface/controller/searchController'
import saveController from '../interface/controller/saveController'

const router: Router = express.Router();
router.get('/save', async (req: Request, res: Response) => {
    const controller = new saveController();
    controller.invoke(req.query.url).then((v:any) => {
        res.send('end');
    });
});
router.get('/search', async (req: Request, res: Response) => {
    const controller = new searchController();
    controller.invoke(req.query.q).then((v:any) => {
        res.send(v);
    });
});

export default router