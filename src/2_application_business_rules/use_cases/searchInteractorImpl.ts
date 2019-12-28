import {ISearchGateway, ISearchResults} from "../gateways/iSearchGateway";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IPresenter} from "../presenters/iPresenter";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import {IOutputPort} from "../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import SearchOutputPort from "./port/output/SearchInputPortImpl";

@injectable()
export default class SearchInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private presenter: IPresenter<ISearchResults>;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter<ISearchResults>) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(input: IInputPort<string>): Promise<any> {
        const keyword: string = input.get();
        const result: ISearchResults = await this.searchGateWay.search(keyword);
        const outPutPort: IOutputPort<ISearchResults> = new SearchOutputPort(result);
        return this.presenter.invoke(outPutPort);
    }
}