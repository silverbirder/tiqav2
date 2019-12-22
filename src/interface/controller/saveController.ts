import saveUseCase from "../../application/usecase/saveUseCase";

export default class saveController {
    invoke(url: any): any {
        return new saveUseCase().invoke(url);
    }
}