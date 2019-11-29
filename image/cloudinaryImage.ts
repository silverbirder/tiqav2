import {IImage} from './i_image';

export class CloudinaryImage extends IImage {
    private cloudinary: any;
    private vision: any;
    private alogoliaIndex: any;
    constructor() {
        super();
        // const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        // const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        // const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        // if (!clondName || !cloudApiKey || !cloudApiSecret) {
        //     throw new Error('No set cloudinary environment');
        // }
        // this.cloudinary = require('cloudinary').v2;
        // this.cloudinary.config({
        //     cloud_name: clondName,
        //     api_key: cloudApiKey,
        //     api_secret: cloudApiSecret
        // })
        // this.vision = require('@google-cloud/vision');
        const algolia: any = require('algoliasearch');
        const algoliaAppId: string = process.env.ALGOLIA_APP_ID || '';
        const algoliaSearchKey: string = process.env.ALGOLIA_SEARCH_KEY || '';
        const algoliaIndexName: string = process.env.ALGOLIA_INDEX_NAME || '';
        const algoliaClient:any = algolia(algoliaAppId, algoliaSearchKey);
        this.alogoliaIndex = algoliaClient.initIndex(algoliaIndexName);
    }
    async save(path: string): Promise<JSON>{
        const res: JSON = await this.cloudinary.uploader.upload(path);
        console.log(`updated ${path}`)
        console.log(res);
        return res;
    }
    get(path: string): string{
        return this.cloudinary.url(path)
    }
    async text(path: string): Promise<string> {
        const client = new this.vision.ImageAnnotatorClient();
        const detectedTexts: Array<any> = await client.textDetection(path);
        const fullTextAnnotation: string = detectedTexts[0].fullTextAnnotation.text;
        return fullTextAnnotation;
  };
    async search(text: string): Promise<JSON> {
      const response:any = await this.alogoliaIndex.search(text);
      return response;
  }
}