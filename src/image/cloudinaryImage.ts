import {IImage, ISearchResults} from './i_image';
interface IVisionClient {
    annotateImage(args: IAnnotateImageArgs): Array<IAnnotatedImage>;
}
interface IAnnotateImageArgs {
  image: {
    source: IImageSource
  },
  features: Array<IFeatures>
}
interface IUpload {
    secure_url: string
}
interface IImageSource {
    filename?: string,
    imageUri?: string
}
interface IImageObject {
    url: string,
    text: string
}
interface IFeatures {
    type: string
}
interface IAnnotatedImage {
    fullTextAnnotation: {
        text: string
    }
}
const vision = require('@google-cloud/vision');
const v2 = require('cloudinary');
import algoliasearch from "algoliasearch";

export class CloudinaryImage extends IImage {
    private alogoliaSearchIndex: algoliasearch.Index;
    private alogoliaAdminIndex: algoliasearch.Index;
    private visionClient: IVisionClient;
    constructor() {
        super();
        const clondName: string = process.env.CLOUDINARY_CLOUD_NAME || '';
        const cloudApiKey: string = process.env.CLOUDINARY_API_KEY || '';
        const cloudApiSecret: string = process.env.CLOUDINARY_API_SECRET || '';
        if (!clondName || !cloudApiKey || !cloudApiSecret) {
            throw new Error('Not set cloudinary environment');
        }
        const algoliaAppId: string = process.env.ALGOLIA_APP_ID || '';
        const algoliaSearchKey: string = process.env.ALGOLIA_SEARCH_KEY || '';
        const algoliaAdminKey: string = process.env.ALGOLIA_ADMIN_KEY || '';
        const algoliaIndexName: string = process.env.ALGOLIA_INDEX_NAME || '';
        if (!algoliaAppId || !algoliaSearchKey || !algoliaAdminKey || !algoliaIndexName) {
            throw new Error('Not set algolia enviroments');
        }
        v2.config({
            cloud_name: clondName,
            api_key: cloudApiKey,
            api_secret: cloudApiSecret
        });
        const algoliaSearchClient: algoliasearch.Client = algoliasearch(algoliaAppId, algoliaSearchKey);
        const algoliaAdminClient: algoliasearch.Client = algoliasearch(algoliaAppId, algoliaAdminKey);
        this.alogoliaSearchIndex = algoliaSearchClient.initIndex(algoliaIndexName);
        this.alogoliaAdminIndex = algoliaAdminClient.initIndex(algoliaIndexName);
        this.visionClient = new vision.ImageAnnotatorClient();
    }
    async save(path: string): Promise<void>{
        const res: IUpload = await v2.uploader.upload(path);
        const text: string = await this.text(path);
        const objects: Array<IImageObject> = [
            {
                "url":res.secure_url,
                "text": text
            }
        ];
        await this.alogoliaAdminIndex.addObjects(objects);
        return;
    }
    async text(path: string): Promise<string> {
        const imageSource: IImageSource = path.startsWith("http") ? {"imageUri": path}: {"filename": path};
        const features: Array<IFeatures> = [
            {type:"DOCUMENT_TEXT_DETECTION"}
        ];
        const annotatedImages: Array<IAnnotatedImage> = await this.visionClient.annotateImage(
            {
                "image": {
                    "source": imageSource
                },
                "features": features
            }
        );
        const annotatedImage: IAnnotatedImage = annotatedImages[0];
        if(annotatedImage.fullTextAnnotation !== null) {
           return annotatedImage.fullTextAnnotation.text;
        }
        return '';
    };
    async search(text: string): Promise<ISearchResults> {
      const response:algoliasearch.Response<ISearchResults> = await this.alogoliaSearchIndex.search(text);
      return response;
    }
}