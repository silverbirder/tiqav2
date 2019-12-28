import {IImageTextGateway} from '../../2_application_business_rules/gateways/iImageTextGateway';
import {injectable} from "inversify";

interface IVisionClient {
    annotateImage(args: IAnnotateImageArgs): Array<IAnnotatedImage>;
}

interface IAnnotateImageArgs {
    image: {
        source: IImageSource
    },
    features: Array<IFeatures>
}

interface IImageSource {
    filename?: string,
    imageUri?: string
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

@injectable()
export class ImageTextGatewayImpl implements IImageTextGateway {
    private visionClient: IVisionClient;

    constructor() {
        this.visionClient = new vision.ImageAnnotatorClient();
    }

    async text(path: string): Promise<string> {
        const imageSource: IImageSource = path.startsWith("http") ? {"imageUri": path} : {"filename": path};
        const features: Array<IFeatures> = [
            {type: "DOCUMENT_TEXT_DETECTION"}
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
        if (annotatedImage.fullTextAnnotation !== null) {
            return annotatedImage.fullTextAnnotation.text;
        }
        return '';
    };
}