import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class TagsInputPortDataFormat implements IPortDataFormat {
    id: string = '';
    keyword: string = '';
}

export class TagsSettableInputPortDataFormat implements IPortDataFormat {
    id: string = '';
    q: string = '';
}

export default class TagsInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: TagsInputPortDataFormat = {id: '', keyword: ''};

    set(params: TagsSettableInputPortDataFormat) {
        if (params.q !== '') {
            this._data.keyword = params.q;
        }
        if (params.id !== '') {
            this._data.id = params.id;
        }
    }

    get(): TagsInputPortDataFormat {
        return this._data;
    }
}