import {IHit, ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import {ImageUrlInputPortFormat} from './port/input/ImageUrlInputPortImpl';
import ImageUrlOutputPortImpl, {
    ImageUrlSettableOutputPortFormat
} from './port/output/ImageUrlOutputPortImpl';
import requestPromise from 'request-promise';

const splitExt = RegExp(/\.(?=[^.]+$)/);

@injectable()
export default class GetImageBinaryInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<ImageUrlInputPortFormat>): Promise<void> {
        const input: ImageUrlInputPortFormat = inputPort.get();
        const hits: Array<IHit> = await this.searchGateWay.search(input.id, '');
        const hitUrl: string = hits[0].url;
        const updateUrl: string = `${hitUrl.split(splitExt)[0]}.${input.extension}`;
        const binary: ArrayBuffer = await requestPromise.get(updateUrl, {encoding: null});
        const outPutPort: IOutputPort<IPortFormat> = new ImageUrlOutputPortImpl();
        const settable: ImageUrlSettableOutputPortFormat = new ImageUrlSettableOutputPortFormat();
        settable.binary = binary;
        outPutPort.set(settable);
        this.presenter.render(outPutPort);
        return;
    }
}