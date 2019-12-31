import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImageOutputPortDataFormat implements IPortDataFormat {
    results: Array<IResult> = [];
}

export class ImageSettableOutputPortDataFormat implements IPortDataFormat {
    id: string = '';
    url: string = '';
    quote: string = '';
    tags: Array<string> = [];
    updateDate!: Date;
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': string,
    'updateDate': Date,
}

export default class SaveOutputPort implements IOutputPort<IPortDataFormat> {
    private _data: ImageOutputPortDataFormat = {results: []};

    set(params: ImageSettableOutputPortDataFormat) {
        const result: IResult = {
            source_url: params.url,
            quote: params.quote,
            id: params.id,
            updateDate: params.updateDate,
        };
        this._data.results.push(result)
    }

    get(): ImageOutputPortDataFormat {
        return this._data;
    }
}