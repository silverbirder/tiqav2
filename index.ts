import { IImage } from './image/i_image'
import {CloudinaryImage} from './image/cloudinaryImage'

let image: IImage;
image = new CloudinaryImage();
image.save('./my_image.jpg');
