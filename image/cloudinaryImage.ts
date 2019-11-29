import {IImage} from './i_image';
import { ClientRequest } from 'http';

export class CloudinaryImage extends IImage {
    private cloudinary: any;
    private vision: any;
    private alogoliaSearchIndex: any;
    private alogoliaAdminIndex: any;
    constructor() {
        super();
        const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        if (!clondName || !cloudApiKey || !cloudApiSecret) {
            throw new Error('Not set cloudinary environment');
        }
        const googleAppCredentials: string = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
        if (!googleAppCredentials) {
            throw new Error('Not set google app credential enviroments');
        }
        const algoliaAppId: string = process.env.ALGOLIA_APP_ID || '';
        const algoliaSearchKey: string = process.env.ALGOLIA_SEARCH_KEY || '';
        const algoliaAdminKey: string = process.env.ALGOLIA_ADMIN_KEY || '';
        const algoliaIndexName: string = process.env.ALGOLIA_INDEX_NAME || '';
        if (!algoliaAppId || !algoliaSearchKey || !algoliaAdminKey || !algoliaIndexName) {
            throw new Error('Not set algolia enviroments');
        }
        this.cloudinary = require('cloudinary').v2;
        this.vision = require('@google-cloud/vision');
        const algolia: any = require('algoliasearch');
        this.cloudinary.config({
            cloud_name: clondName,
            api_key: cloudApiKey,
            api_secret: cloudApiSecret
        })
        const algoliaSearchClient:any = algolia(algoliaAppId, algoliaSearchKey);
        const algoliaAdminClient: any = algolia(algoliaAppId, algoliaAdminKey);
        this.alogoliaSearchIndex = algoliaSearchClient.initIndex(algoliaIndexName);
        this.alogoliaAdminIndex = algoliaAdminClient.initIndex(algoliaIndexName);
    }
    async save(path: string): Promise<void>{
        const res: any = await this.cloudinary.uploader.upload(path);
        const text: string = await this.text(path);
        const objects: Array<object> = [
            {
                "url":res.secure_url,
                "text": text
            }
        ]
        this.alogoliaAdminIndex.addObjects(objects)
        return;
    }
    get(path: string): string{
        return this.cloudinary.url(path)
    }
    async text(path: string): Promise<string> {
        const client = new this.vision.ImageAnnotatorClient();
        const imageSource: any = path.startsWith("http") ? {"imageUri": path}: {"filename": path};
        const features: Array<any> = [
            // {type:"TYPE_UNSPECIFIED"},
            // {type:"FACE_DETECTION"},
            // {type:"LANDMARK_DETECTION"},
            // {type:"LOGO_DETECTION"},
            // {type:"LABEL_DETECTION"},
            // {type:"TEXT_DETECTION"},
            {type:"DOCUMENT_TEXT_DETECTION"}
            // {type:"SAFE_SEARCH_DETECTION"},
            // {type:"IMAGE_PROPERTIES"},
            // {type:"CROP_HINTS"},
            // {type:"WEB_DETECTION"},
            // {type:"PRODUCT_SEARCH"},
            // {type:"OBJECT_LOCALIZATION"}
        ];
        const annotatedImages: any = await client.annotateImage(
            {
                "image": {
                    "source": imageSource
                },
                "features": features
            }
        );
        const annotatedImage: any = annotatedImages[0];
        if(annotatedImage.fullTextAnnotation !== null) {
           return annotatedImage.fullTextAnnotation.text;
        }
        return '';
    };
    async search(text: string): Promise<JSON> {
      const response:any = await this.alogoliaSearchIndex.search(text);
      return response;
    }
}