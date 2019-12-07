import {IImage, ISearchResults} from './image/i_image'
import {CloudinaryImage} from './image/cloudinaryImage'
import express, {Express, Request, Response} from 'express';

const app: Express = express();
app.get('/save', async (req: Request, res: Response) => {
    if (!req.query.url) {
        res.send('not exit query parameter: url');
    }
    let image: IImage;
    image = new CloudinaryImage();
    await image.save(req.query.url);
    res.send('end');
});
app.get('/search', async (req: Request, res: Response) => {
    if (!req.query.q) {
        res.send('not exit query parameter: q');
    }
    let image: IImage;
    image = new CloudinaryImage();
    const result: ISearchResults = await image.search(req.query.q);
    res.json(result.hits);
});
const port: string = process.env.PORT || '8080';
app.listen(port, () => console.log(`Listening on port ${port}`));