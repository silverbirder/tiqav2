import {IHit, ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '../presenters/iPresenter';
import {IPortDataFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import {ImageUrlInputPortDataFormat} from "./port/input/ImageUrlInputPortImpl";
import ImageUrlOutputPortImpl, {
    ImageUrlSettableOutputPortDataFormat
} from "./port/output/ImageUrlOutputPortImpl";
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

    async invoke(inputPort: IInputPort<ImageUrlInputPortDataFormat>): Promise<void> {
        const input: ImageUrlInputPortDataFormat = inputPort.get();
        const hits: Array<IHit> = await this.searchGateWay.search(input.id, '');
        const hitUrl: string = hits[0].url;
        const updateUrl:string = `${hitUrl.split(splitExt)[0]}.${input.ext}`;
        const binary: ArrayBuffer = await requestPromise.get(updateUrl, {encoding: null});
        const outPutPort: IOutputPort<IPortDataFormat> = new ImageUrlOutputPortImpl();
        const settable: ImageUrlSettableOutputPortDataFormat = new ImageUrlSettableOutputPortDataFormat();
        settable.binary = binary;
        outPutPort.set(settable);
        this.presenter.invoke(outPutPort);
    }
}