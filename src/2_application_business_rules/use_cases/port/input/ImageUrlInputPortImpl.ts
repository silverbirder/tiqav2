import {IInputPort, IInputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IRequest} from '../../../controllers/iController';

export class ImageUrlInputPortFormat implements IInputPortFormat {
    id: number = 0;
    extension: string = '';
}


export default class ImageUrlInputPortImpl implements IInputPort<IInputPortFormat> {
    private _data: ImageUrlInputPortFormat = {id: 0, extension: ''};

    set(request: IRequest) {
        this._data.id = request.id;
        this._data.extension = request.extension;
    }

    get(): ImageUrlInputPortFormat {
        return this._data;
    }
}