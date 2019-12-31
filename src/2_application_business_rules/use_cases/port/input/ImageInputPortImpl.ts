import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImageInputPortDataFormat implements IPortDataFormat {
    url: string = '';
    id: string = '';
    tags: Array<string> = [];
    quote: string = '';
}

export class ImageSettableInputPortDataFormat implements IPortDataFormat {
    url: string = '';
    id: string = '';
    tags: string = '';
    quote: string = '';
}

export default class ImageInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: ImageInputPortDataFormat = {url: '', id: '', tags: [], quote: ''};

    set(params: ImageSettableInputPortDataFormat) {
        if (params.id !== '') {
            this._data.id = params.id;
        }
        if (params.url !== '') {
            this._data.url = params.url;
        }
        if (params.tags !== '') {
            this._data.tags = params.tags.split(',');
        }
        if (params.quote !== '') {
            this._data.quote = params.quote;
        }
    }

    get(): ImageInputPortDataFormat {
        return this._data;
    }
}