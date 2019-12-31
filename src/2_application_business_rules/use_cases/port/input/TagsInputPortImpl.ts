import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';

export class TagsInputPortFormat implements IInputPortFormat {
    id: string = '';
    keyword: string = '';
}

export class TagsSettableInputPortFormat implements IInputPortFormat {
    id: string = '';
    q: string = '';
}

export default class TagsInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: TagsInputPortFormat = {id: '', keyword: ''};

    set(params: TagsSettableInputPortFormat) {
        if (params.q !== '') {
            this._data.keyword = params.q;
        }
        if (params.id !== '') {
            this._data.id = params.id;
        }
    }

    get(): TagsInputPortFormat {
        return this._data;
    }
}