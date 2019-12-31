import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class SearchInputPortDataFormat implements IPortDataFormat {
    keyword: string = '';
    id: string = '';
}

export class SearchSettableInputPortDataFormat implements IPortDataFormat {
    q: string = '';
    id: string = '';
}

export default class SearchInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: SearchInputPortDataFormat = {keyword: '', id: ''};

    set(params: SearchSettableInputPortDataFormat) {
        if (params.q !== '') {
            this._data.keyword = params.q;
        }
        if (params.id !== '') {
            this._data.id = params.id;
        }
    }

    get(): SearchInputPortDataFormat {
        return this._data;
    }
}