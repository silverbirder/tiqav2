import requestPromise from 'request-promise';

import {inject, injectable} from 'inversify';

import {TYPES} from '@src/types';

import {IInputPort} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';
import {IOutputPort} from '@src/1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';
import {IPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iPort';
import {IUseCase} from '@src/1_enterprise_business_rules/use_cases/iUseCase';
import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

import {
    ImageOutputPortImpl,
    ImageSettableOutputPortFormat,
} from '@src/2_application_business_rules/use_cases/port/output/ImageOutputPortImpl';
import {ISearchGateway} from '@src/2_application_business_rules/gateways/iSearchGateway';
import {ImageInputPortFormat} from '@src/2_application_business_rules/use_cases/port/input/ImageInputPortImpl';

const splitExt = RegExp(/\.(?=[^.]+$)/);

@injectable()
export class GetImageInteractorImpl implements IUseCase {
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
        const entity: ImageEntityImpl = entities[0];
        if(!entity.hasExt(input.extension)) {
          throw new Error(`Please choose one of [${entity.extension}]`);
        };
        const hitUrl: string = entity.url;
        const updateUrl: string = `${hitUrl.split(splitExt)[0]}.${input.extension}`;
        const binary: ArrayBuffer = await requestPromise.get(updateUrl, {encoding: null});
        const outPutPort: IOutputPort<IPortFormat> = new ImageOutputPortImpl();
        const settable: ImageSettableOutputPortFormat = {binary: binary};
        outPutPort.set(settable);
        this.presenter.render(outPutPort);
        return;
    }
}