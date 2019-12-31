import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export class TagsOutputPortFormat implements IOutputPortFormat {
}

export class TagsSettableOutputPortFormat implements IOutputPortFormat {
    tags: Array<string> = [];
}

export default class TagsOutputPort implements IOutputPort<IOutputPortFormat> {
    private _data: TagsOutputPortFormat = {};

    set(params: TagsSettableOutputPortFormat) {
        this._data = params.tags;
    }

    get(): TagsOutputPortFormat {
        return this._data;
    }
}