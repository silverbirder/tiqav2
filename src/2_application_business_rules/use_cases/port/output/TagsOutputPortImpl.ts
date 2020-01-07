import {IOutputPort, IOutputPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iOutputPort';

export interface TagsOutputPortFormat extends IOutputPortFormat {
}

export interface TagsSettableOutputPortFormat extends IOutputPortFormat {
    tags: Array<string>;
}

export class TagsOutputPortImpl implements IOutputPort<IOutputPortFormat> {
    private _data: TagsOutputPortFormat = {};

    set(params: TagsSettableOutputPortFormat) {
        this._data = params.tags;
    }

    get(): TagsOutputPortFormat {
        return this._data;
    }
}