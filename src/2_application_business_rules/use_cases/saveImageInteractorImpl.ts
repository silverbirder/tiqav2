import {IHit, IndexObject} from '../../2_application_business_rules/gateways/iSearchGateway';
import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import {IImageTextGateway} from '../gateways/iImageTextGateway';
import {IImageGateway} from '../gateways/iImageGateway';
import {ISearchGateway} from '../gateways/iSearchGateway';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IInputPort} from '../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {ImagePortDataFormat} from './port/input/ImageInputPortImpl';
import {IPortDataFormat} from "../../1_enterprise_business_rules/use_cases/port/iPort";
import {IPresenter} from "../presenters/iPresenter";
import {IOutputPort} from "../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import ImageOutputPortImpl from "./port/output/ImageOutputPortImpl";

@injectable()
export default class SaveImageInteractorImpl implements IUseCase {
    private imageTextGateWay: IImageTextGateway;
    private imageGateWay: IImageGateway;
    private searchGateWay: ISearchGateway;
    private presenter: IPresenter<IPortDataFormat>;

    constructor(
        @inject(TYPES.ImageTextGateway) imageTextGateWay: IImageTextGateway,
        @inject(TYPES.ImageGateway) imageGateWay: IImageGateway,
        @inject(TYPES.SearchGateway) searchGateWay: ISearchGateway,
        @inject(TYPES.Presenter) presenter: IPresenter<IPortDataFormat>
        ) {
        this.imageTextGateWay = imageTextGateWay;
        this.imageGateWay = imageGateWay;
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<ImagePortDataFormat>): Promise<any> {
        const input: ImagePortDataFormat = inputPort.get();
        const quote: string = input.quote != '' ? input.quote: await this.imageTextGateWay.text(input.url);
        const saved_url = await this.imageGateWay.save(input.url);
        let index: IndexObject = {
            url: saved_url,
            quote: quote,
            updateDate: new Date(),
        };
        if(input.tags.length > 0) {
            index.tags = input.tags;
        }
        const objectID = await this.searchGateWay.save(index);
        const outPutPort: IOutputPort<IPortDataFormat> = new ImageOutputPortImpl();
        outPutPort.set({id: objectID, url: index.url, quote: index.quote, updateDate: index.updateDate});
        return this.presenter.invoke(outPutPort);
    }
}