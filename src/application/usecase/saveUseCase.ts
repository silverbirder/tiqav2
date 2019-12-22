import {ImageText} from "../../infrastructure/imageText";
import {Image} from "../../infrastructure/image";
import {IImageObject, Search} from "../../infrastructure/search";

export default class saveUseCase {
    async invoke(url: any): Promise<any> {
        const text = await new ImageText().text(url);
        const saved_url = await new Image().save(url);
        const content: Array<IImageObject> = [{
            "url": saved_url,
            "text": text
        }];
        await new Search().save(content);
    }
}