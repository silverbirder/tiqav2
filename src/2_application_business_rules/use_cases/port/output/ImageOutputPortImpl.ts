import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export class ImageOutputPortFormat implements IOutputPortFormat {
    results: Array<IResult> = [];
}

export class ImageSettableOutputPortFormat implements IOutputPortFormat {
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

export default class SaveOutputPort implements IOutputPort<IOutputPortFormat> {
    private _data: ImageOutputPortFormat = {results: []};

    set(params: ImageSettableOutputPortFormat) {
        const result: IResult = {
            source_url: params.url,
            quote: params.quote,
            id: params.id,
            updateDate: params.updateDate,
        };
        this._data.results.push(result)
    }

    get(): ImageOutputPortFormat {
        return this._data;
    }
}