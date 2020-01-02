import {IImageGateway} from '../../2_application_business_rules/gateways/iImageGateway';
import {injectable} from 'inversify';

interface IUpload {
    secure_url: string
}

import {ImageFormat} from 'cloudinary';

const v2 = require('cloudinary');

@injectable()
export class ImageGatewayImpl implements IImageGateway {
    supportExtension: Array<ImageFormat> = ['gif', 'png', 'jpg', 'bmp', 'ico', 'pdf', 'tiff', 'eps', 'jpc', 'jp2', 'psd', 'webp', 'zip', 'svg', 'mp4', 'webm', 'wdp', 'hpx', 'djvu', 'ai', 'flif', 'bpg', 'miff', 'tga', 'heic'];

    constructor() {
        const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        if (!clondName || !cloudApiKey || !cloudApiSecret) {
            throw new Error('Not set cloudinary environment');
        }
        v2.config({
            api_key: cloudApiKey,
            cloud_name: clondName,
            api_secret: cloudApiSecret
        });
    }

    async save(path: string): Promise<string> {
        const res: IUpload = await v2.uploader.upload(path);
        return res.secure_url;
    }
}