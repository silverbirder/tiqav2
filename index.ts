import { IImage } from './image/i_image'
import {CloudinaryImage} from './image/cloudinaryImage'
import express from 'express';

const app = express();
app.get('/save', (req, res) => {
    if (!req.query.url) {
        res.send('not exit query parameter: url');
    }
    let image: IImage;
    image = new CloudinaryImage();
    image.save(req.query.url);
    res.send('end');
});
app.get('/search', async (req, res) => {
    if (!req.query.q) {
        res.send('not exit query parameter: q');
    }
    let image: IImage;
    image = new CloudinaryImage();
    const result: any = await image.search(req.query.q);
    res.json(result.hits);
});
app.listen(8080, () => console.log('Listening on port 8080'));