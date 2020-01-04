import {inject, injectable} from 'inversify';
import {TYPES} from '@src/types';

import {IUseCase} from '@src/1_enterprise_business_rules/use_cases/iUseCase';
import {IInputPort} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '@src/1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';
import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

import {SearchInputPortFormat} from '@src/2_application_business_rules/use_cases/port/input/SearchInputPortImpl';
import {IImageGateway} from '@src/2_application_business_rules/gateways/iImageGateway';
import {ISearchGateway} from '@src/2_application_business_rules/gateways/iSearchGateway';
import {SearchOutputPortImpl} from '@src/2_application_business_rules/use_cases/port/output/SearchOutputPortImpl';

@injectable()
export class SearchNewestInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    private imageGateWay: IImageGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.ImageGateway) imageGateWay: IImageGateway,
        @inject(TYPES.SearchPresenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.imageGateWay = imageGateWay;
        this.presenter = presenter;
    }

    async invoke(_: IInputPort<SearchInputPortFormat>): Promise<void> {
        const entities: Array<ImageEntityImpl> = await this.searchGateWay.newest();
        const outPutPort: IOutputPort<IPortFormat> = new SearchOutputPortImpl();
        outPutPort.set(entities);
        this.presenter.render(outPutPort);
        return;
    }
}