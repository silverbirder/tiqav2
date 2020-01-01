import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import path from 'path';

export class SearchOutputPortFormat implements IOutputPortFormat {
    results: Array<IResult> = [];
}

export class SearchSettableOutputPortFormat implements IOutputPortFormat {
    id: number = 0;
    url: string = '';
    quote: string = '';
    updateDate!: Date;
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': number,
    'ext': string,
    'updateDate': Date,
}

export default class SearchOutputPort implements IOutputPort<IOutputPortFormat> {
    private _data: SearchOutputPortFormat = {results: []};

    set(params: SearchSettableOutputPortFormat) {
        const ext: string = path.extname(params.url);
        const result: IResult = {
            source_url: params.url,
            quote: params.quote,
            id: params.id,
            ext: ext.slice(1),
            updateDate: params.updateDate,
        };
        this._data.results.push(result)
    }

    get(): SearchOutputPortFormat {
        return this._data;
    }
}