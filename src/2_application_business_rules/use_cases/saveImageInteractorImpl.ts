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
import {IPresenter} from '../../1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '../../1_enterprise_business_rules/use_cases/port/iPort';
import SearchOutputPortImpl from './port/output/SearchOutputPortImpl';
import ImageEntityImpl from '../../1_enterprise_business_rules/entities/imageEntityImpl';
import path from 'path';

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
        @inject(TYPES.SearchPresenter) presenter: IPresenter,
    ) {
        this.imageTextGateWay = imageTextGateWay;
        this.imageGateWay = imageGateWay;
        this.searchGateWay = searchGateWay;
        this.presenter = presenter;
    }

    async invoke(inputPort: IInputPort<ImageInputPortFormat>): Promise<void> {
        const input: ImageInputPortFormat = inputPort.get();
        const quote: string = input.quote != '' ? input.quote : await this.imageTextGateWay.text(input.url);
        let url: string = '';
        let ext: Array<string> = [];
        if (input.savedImage) {
            url = await this.imageGateWay.save(input.url);
            ext = this.imageGateWay.supportExtension;
        } else {
            url = input.url;
            ext = [path.extname(url).slice(1)];
        }
        let index: IndexObject = {
            url: url,
            quote: quote,
            tags: input.tags,
            extension: ext,
            updateDate: new Date(),
        };
        const objectID = await this.searchGateWay.save(index);
        index.objectID = objectID;
        const outPutPort: IOutputPort<IPortFormat> = new SearchOutputPortImpl();
        const entity: ImageEntityImpl = new ImageEntityImpl(index);
        outPutPort.set([entity]);
        this.presenter.render(outPutPort);
        return;
    }
}