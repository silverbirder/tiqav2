import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IRequest} from "../../../controllers/iController";

export class ImageInputPortFormat implements IInputPortFormat {
    url: string = '';
    id: number = 0;
    tags: Array<string> = [];
    quote: string = '';
}


export default class ImageInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: ImageInputPortFormat = {url: '', id: 0, tags: [], quote: ''};

    set(request: IRequest) {
        this._data.id = request.id;
        this._data.url = request.url;
        this._data.tags = request.tags;
        this._data.quote = request.quote;
    }

    get(): ImageInputPortFormat {
        return this._data;
    }
}