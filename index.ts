import { IImage } from './image/i_image'
import {CloudinaryImage} from './image/cloudinaryImage'
import express from 'express';

const app = express();
app.get('/', (req, res) => {
    if (req.query.url) {
        let image: IImage;
        image = new CloudinaryImage();
        image.save(req.query.url);
    }
    res.send('end');
});
app.listen(8080, () => console.log('Listening on port 8080'));