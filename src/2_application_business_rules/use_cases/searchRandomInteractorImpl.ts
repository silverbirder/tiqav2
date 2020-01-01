import {IHit, ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import SearchOutputPort, {SearchSettableOutputPortFormat} from './port/output/SearchOutputPortImpl';
import {SearchInputPortFormat} from './port/input/SearchInputPortImpl';
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

@injectable()
export default class SearchRandomInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<SearchInputPortFormat>): Promise<void> {
        const hits: Array<IHit> = await this.searchGateWay.random();
        const outPutPort: IOutputPort<IPortFormat> = new SearchOutputPort();
        hits.forEach((hit: IHit) => {
            const settable: SearchSettableOutputPortFormat = {
                id: hit.objectID,
                url: hit.url,
                quote: hit.quote,
                updateDate: hit.updateDate,
            };
            outPutPort.set(settable);
        });
        this.presenter.render(outPutPort);
        return;
    }
}