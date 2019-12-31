import {IHit, ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import SearchOutputPort, {SearchSettableOutputPortDataFormat} from './port/output/SearchOutputPortImpl';
import {SearchInputPortDataFormat} from './port/input/SearchInputPortImpl';
import {IPresenter} from '../presenters/iPresenter';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';


@injectable()
export default class SearchNormalInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<SearchInputPortDataFormat>): Promise<void> {
        const input: SearchInputPortDataFormat = inputPort.get();
        const hits: Array<IHit> = await this.searchGateWay.search(input);
        const outPutPort: IOutputPort<IPortDataFormat> = new SearchOutputPort();
        hits.forEach((hit: IHit) => {
            const settable: SearchSettableOutputPortDataFormat = new SearchSettableOutputPortDataFormat();
            settable.id = hit.objectID;
            settable.url = hit.url;
            settable.quote = hit.quote;
            settable.updateDate = hit.updateDate;
            outPutPort.set(settable);
        });
        this.presenter.invoke(outPutPort);
    }
}