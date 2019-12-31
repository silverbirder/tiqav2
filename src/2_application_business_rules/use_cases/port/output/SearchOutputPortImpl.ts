import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import path from 'path';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class SearchOutputPortDataFormat implements IPortDataFormat {
    results: Array<IResult> = [];
}

export class SearchSettableOutputPortDataFormat implements IPortDataFormat {
    id: string = '';
    url: string = '';
    quote: string = '';
    updateDate!: Date;
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': string,
    'ext': string,
    'updateDate': Date,
}

export default class SearchOutputPort implements IOutputPort<IPortDataFormat> {
    private _data: SearchOutputPortDataFormat = {results: []};

    set(params: SearchSettableOutputPortDataFormat) {
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

    get(): SearchOutputPortDataFormat {
        return this._data;
    }
}