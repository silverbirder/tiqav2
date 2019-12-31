import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImageUrlInputPortDataFormat implements IPortDataFormat {
    id: string = '';
    ext: string = '';
}

export default class ImageUrlInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: ImageUrlInputPortDataFormat = {id: '', ext: ''};

    set(params: { id: string, ext: string }) {

        this._data.id = params.id;
        this._data.ext = params.ext;
    }

    get(): ImageUrlInputPortDataFormat {
        return this._data;
    }
}