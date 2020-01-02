import {ISearchGateway} from '../gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import ImageUrlOutputPortImpl, {
    ImageSettableOutputPortFormat
} from './port/output/ImageOutputPortImpl';
import requestPromise from 'request-promise';
import {ImageInputPortFormat} from './port/input/ImageInputPortImpl';
import ImageEntityImpl from '../../1_enterprise_business_rules/entities/imageEntityImpl';

const splitExt = RegExp(/\.(?=[^.]+$)/);

@injectable()
export default class GetImageInteractorImpl implements IUseCase {
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.ImagePresenter) presenter: IPresenter,
    ) {
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<ImageInputPortFormat>): Promise<void> {
        const input: ImageInputPortFormat = inputPort.get();
        const entities: Array<ImageEntityImpl> = await this.searchGateWay.search(input.id, '', []);
        const hitUrl: string = entities[0].url;
        const updateUrl: string = `${hitUrl.split(splitExt)[0]}.${input.extension}`;
        const binary: ArrayBuffer = await requestPromise.get(updateUrl, {encoding: null});
        const outPutPort: IOutputPort<IPortFormat> = new ImageUrlOutputPortImpl();
        const settable: ImageSettableOutputPortFormat = {binary: binary};
        outPutPort.set(settable);
        this.presenter.render(outPutPort);
        return;
    }
}