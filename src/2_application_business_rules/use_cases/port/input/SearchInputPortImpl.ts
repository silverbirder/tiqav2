import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IRequest} from "../../../controllers/iController";

export class SearchInputPortFormat implements IInputPortFormat {
    keyword: string = '';
    id: number = 0;
}


export default class SearchInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: SearchInputPortFormat = {keyword: '', id: 0};

    set(request: IRequest) {
        this._data.keyword = request.keyword;
        this._data.id = request.id;
    }

    get(): SearchInputPortFormat {
        return this._data;
    }
}