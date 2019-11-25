import {IImage} from './i_image';

export class CloudinaryImage extends IImage {
    private cloudinary: any;
    constructor() {
        super();
        const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        if (!clondName || !cloudApiKey || !cloudApiSecret) {
            throw new Error('No set cloudinary environment');
        }
        this.cloudinary = require('cloudinary').v2;
        this.cloudinary.config({
            cloud_name: clondName,
            api_key: cloudApiKey,
            api_secret: cloudApiSecret
        })
    }
    async save(path: string): Promise<void>{
        await this.cloudinary.uploader.upload(path);
        return;
    }
}