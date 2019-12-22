import searchUseCase from "../../application/usecase/searchUseCase";

export default class searchController {
    invoke(q: any): any {
        return new searchUseCase().invoke(q);
    }
}