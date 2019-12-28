import {ISearchGateway} from "../gateways/iSearchGateway";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IPresenter} from "../presenters/iPresenter";

export default class SearchUseCaseImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private presenter: IPresenter;

    constructor(searchGateWay: ISearchGateway, presenter: IPresenter) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(q: any): Promise<any> {
        const result = await this.searchGateWay.search(q);
        return this.presenter.invoke(result);
    }
}