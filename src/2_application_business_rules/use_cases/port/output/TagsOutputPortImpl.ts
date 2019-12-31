import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class TagsOutputPortDataFormat implements IPortDataFormat {
}

export class TagsSettableOutputPortDataFormat implements IPortDataFormat {
    tags: Array<string> = [];
}

export default class TagsOutputPort implements IOutputPort<IPortDataFormat> {
    private _data: TagsOutputPortDataFormat = {};

    set(params: TagsSettableOutputPortDataFormat) {
        this._data = params.tags;
    }

    get(): TagsOutputPortDataFormat {
        return this._data;
    }
}