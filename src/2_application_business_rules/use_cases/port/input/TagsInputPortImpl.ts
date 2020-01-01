import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IRequest} from '../../../controllers/iController';

export class TagsInputPortFormat implements IInputPortFormat {
    id: number = 0;
    keyword: string = '';
}


export default class TagsInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: TagsInputPortFormat = {id: 0, keyword: ''};

    set(request: IRequest) {
        this._data.keyword = request.keyword;
        this._data.id = request.id;
    }

    get(): TagsInputPortFormat {
        return this._data;
    }
}