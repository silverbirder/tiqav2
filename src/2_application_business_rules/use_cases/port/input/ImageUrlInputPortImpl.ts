import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';

export class ImageUrlInputPortFormat implements IInputPortFormat {
    id: string = '';
    ext: string = '';
}

export class ImageUrlSettableInputPortFormat implements IInputPortFormat {
    id: string = '';
    ext: string = '';
}

export default class ImageUrlInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: ImageUrlInputPortFormat = {id: '', ext: ''};

    set(params: { id: string, ext: string }) {

        this._data.id = params.id;
        this._data.ext = params.ext;
    }

    get(): ImageUrlInputPortFormat {
        return this._data;
    }
}