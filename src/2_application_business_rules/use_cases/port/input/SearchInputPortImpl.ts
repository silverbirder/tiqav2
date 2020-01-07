import {IInputPort, IInputPortFormat} from '@src/1_enterprise_business_rules/use_cases/port/iInputPort';

import {IRequest} from '@src/2_application_business_rules/controllers/iController';

export interface SearchInputPortFormat extends IInputPortFormat {
    keyword: string;
    id: number;
    tags: Array<string>;
}


export class SearchInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: SearchInputPortFormat = {keyword: '', id: 0, tags: []};

    set(request: IRequest) {
        this._data.keyword = request.keyword;
        this._data.id = request.id;
        this._data.tags = request.tags;
    }

    get(): SearchInputPortFormat {
        return this._data;
    }
}