import {ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import SearchOutputPort from './port/output/SearchOutputPortImpl';
import {SearchInputPortFormat} from './port/input/SearchInputPortImpl';
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import ImageEntityImpl from "../../1_enterprise_business_rules/entities/imageEntityImpl";
import {IImageGateway} from "../gateways/iImageGateway";


@injectable()
export default class SearchNormalInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private imageGateWay: IImageGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.ImageGateway) imageGateWay: IImageGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.imageGateWay = imageGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<SearchInputPortFormat>): Promise<void> {
        const input: SearchInputPortFormat = inputPort.get();
        const entities: Array<ImageEntityImpl> = await this.searchGateWay.search(input.id, input.keyword, input.tags);
        const outPutPort: IOutputPort<IPortFormat> = new SearchOutputPort();
        outPutPort.set({entities: entities, extension: this.imageGateWay.supportExtension});
        this.presenter.render(outPutPort);
        return;
    }
}