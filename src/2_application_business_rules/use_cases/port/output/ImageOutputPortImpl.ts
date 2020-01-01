import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export interface ImageOutputPortFormat extends IOutputPortFormat {
    results: Array<IResult>;
}

export interface ImageSettableOutputPortFormat extends IOutputPortFormat {
    id: number;
    url: string;
    quote: string;
    tags: Array<string>;
    updateDate: Date;
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': number,
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