import {IHit, ISearchGateway} from "../gateways/iSearchGateway";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IPresenter} from "../presenters/iPresenter";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import {IOutputPort} from "../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import SearchOutputPort from "./port/output/SearchOutputPortImpl";
import {IResults} from "./port/output/SearchOutputPortImpl";

@injectable()
export default class SearchRandomInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private presenter: IPresenter<IResults>;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter<IResults>) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(_: IInputPort<string>): Promise<any> {
        const hits: Array<IHit> = await this.searchGateWay.random();
        const outPutPort: IOutputPort<IResults> = new SearchOutputPort();
        hits.forEach((value: IHit) => {
            outPutPort.add(value.objectID, value.url, value.text);
        });
        return this.presenter.invoke(outPutPort);
    }
}