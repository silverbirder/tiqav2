import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImageUrlOutputPortDataFormat implements IPortDataFormat {
    url: string = '';
}

export default class ImageUrlOutputPort implements IOutputPort<ImageUrlOutputPortDataFormat> {
    private _data: ImageUrlOutputPortDataFormat = {url: ''};

    set(params: { url: string }) {
        this._data.url = params.url;
    }

    get(): ImageUrlOutputPortDataFormat {
        return this._data;
    }
}