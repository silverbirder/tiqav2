import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';

export class ImageInputPortFormat implements IInputPortFormat {
    url: string = '';
    id: string = '';
    tags: Array<string> = [];
    quote: string = '';
}

export class ImageSettableInputPortFormat implements IInputPortFormat {
    url: string = '';
    id: string = '';
    tags: string = '';
    quote: string = '';
}

export default class ImageInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: ImageInputPortFormat = {url: '', id: '', tags: [], quote: ''};

    set(params: ImageSettableInputPortFormat) {
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

    get(): ImageInputPortFormat {
        return this._data;
    }
}