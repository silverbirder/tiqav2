import {Search} from "../../infrastructure/search";
import searchPresenter from "../../interface/presenter/searchPresenter";

export default class searchUseCase {
    async invoke(q: any): Promise<any> {
        const result = await new Search().search(q);
        return new searchPresenter().invoke(result);
    }
}