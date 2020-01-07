import {IInputPort, IInputPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';

import {IRequest} from '@src/2_application_business_rules/controllers/iController';


export interface TagsInputPortFormat extends IInputPortFormat {
    id: number;
    keyword: string;
}


export class TagsInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: TagsInputPortFormat = {id: 0, keyword: ''};

    set(request: IRequest) {
        this._data.keyword = request.keyword;
        this._data.id = request.id;
    }

    get(): TagsInputPortFormat {
        return this._data;
    }
}