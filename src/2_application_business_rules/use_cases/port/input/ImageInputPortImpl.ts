import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImagePortDataFormat implements IPortDataFormat {
    url: string = '';
    id: string = '';
    tags: Array<string> = [];
    quote: string = '';
}

export default class ImageInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: ImagePortDataFormat = {url: '', id: '', tags: [], quote: ''};

    set(params: {url: string, id: string}) {
        this._data.url = params.url;
        this._data.id = params.id;
    }

    get(): IPortDataFormat {
        return this._data;
    }
}