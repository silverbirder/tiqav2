abstract class Image {
    abstract async save(): Promise<void>;
}

class CloudinaryImage extends Image {
    private cloudinary: any;
    constructor() {
        super();
        this.cloudinary = require('cloudinary').v2;
        this.cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
    async save(): Promise<void>{
        await this.cloudinary.uploader.upload("./my_image.jpg");
        return;
    }
}
export = {CloudinaryImage, Image};