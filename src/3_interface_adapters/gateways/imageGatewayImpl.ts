import {IImageGateway} from '../../2_application_business_rules/gateways/iImageGateway';
import {injectable} from "inversify";

interface IUpload {
    secure_url: string
}

const v2 = require('cloudinary');

@injectable()
export class ImageGatewayImpl implements IImageGateway {
    constructor() {
        const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        if (!clondName || !cloudApiKey || !cloudApiSecret) {
            throw new Error('Not set cloudinary environment');
        }
        v2.config({
            cloud_name: clondName,
            api_key: cloudApiKey,
            api_secret: cloudApiSecret
        });
    }

    async save(path: string): Promise<string> {
        const res: IUpload = await v2.uploader.upload(path);
        return res.secure_url;
    }
}