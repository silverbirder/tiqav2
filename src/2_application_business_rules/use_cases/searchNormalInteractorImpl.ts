import {IHit, ISearchGateway} from "../gateways/iSearchGateway";
import {IUseCase} from "../../1_enterprise_business_rules/use_cases/iUseCase";
import {IPresenter} from "../presenters/iPresenter";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IInputPort} from "../../1_enterprise_business_rules/use_cases/port/iInputPort";
import {IOutputPort} from "../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import SearchOutputPort from "./port/output/SearchOutputPortImpl";
import {IPortDataFormat} from "../../1_enterprise_business_rules/use_cases/port/iPort";

@injectable()
export default class SearchNormalInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private presenter: IPresenter<IPortDataFormat>;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter<IPortDataFormat>) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<IPortDataFormat>): Promise<any> {
        const input: IPortDataFormat = inputPort.get();
        const hits: Array<IHit> = await this.searchGateWay.search(input);
        const outPutPort: IOutputPort<IPortDataFormat> = new SearchOutputPort();
        hits.forEach((hit: IHit) => {
            outPutPort.set({id: hit.objectID, url: hit.url, text: hit.text});
        });
        return this.presenter.invoke(outPutPort);
    }
}