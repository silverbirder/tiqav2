import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';

export class SearchInputPortFormat implements IInputPortFormat {
    keyword: string = '';
    id: string = '';
}

export class SearchSettableInputPortFormat implements IInputPortFormat {
    q: string = '';
    id: string = '';
}

export default class SearchInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: SearchInputPortFormat = {keyword: '', id: ''};

    set(params: SearchSettableInputPortFormat) {
        if (params.q !== '') {
            this._data.keyword = params.q;
        }
        if (params.id !== '') {
            this._data.id = params.id;
        }
    }

    get(): SearchInputPortFormat {
        return this._data;
    }
}