import {IndexObject} from '../../2_application_business_rules/gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IImageTextGateway} from '../gateways/iImageTextGateway';
import {IImageGateway} from '../gateways/iImageGateway';
import {ISearchGateway} from '../gateways/iSearchGateway';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {ImageInputPortFormat} from './port/input/ImageInputPortImpl';
import {IOutputPort} from '../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import ImageOutputPortImpl, {ImageSettableOutputPortFormat} from './port/output/ImageOutputPortImpl';
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';

@injectable()
export default class SaveImageInteractorImpl implements IUseCase {
    private imageTextGateWay: IImageTextGateway;
    private imageGateWay: IImageGateway;
    private searchGateWay: ISearchGateway;
    presenter: IPresenter;

    constructor(
        @inject(TYPES.ImageTextGateway) imageTextGateWay: IImageTextGateway,
        @inject(TYPES.ImageGateway) imageGateWay: IImageGateway,
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter,
    ) {
        this.imageTextGateWay = imageTextGateWay;
        this.imageGateWay = imageGateWay;
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<ImageInputPortFormat>): Promise<void> {
        const input: ImageInputPortFormat = inputPort.get();
        const quote: string = input.quote != '' ? input.quote : await this.imageTextGateWay.text(input.url);
        const saved_url = await this.imageGateWay.save(input.url);
        let index: IndexObject = {
            url: saved_url,
            quote: quote,
            tags: input.tags,
            updateDate: new Date(),
        };
        const objectID = await this.searchGateWay.save(index);
        const outPutPort: IOutputPort<IPortFormat> = new ImageOutputPortImpl();
        const settable: ImageSettableOutputPortFormat = new ImageSettableOutputPortFormat();
        settable.id = objectID;
        settable.url = index.url;
        settable.quote = index.quote;
        settable.tags = index.tags;
        settable.updateDate = index.updateDate;
        outPutPort.set(settable);
        this.presenter.render(outPutPort);
        return;
    }
}