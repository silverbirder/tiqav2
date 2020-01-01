import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import path from 'path';

export interface SearchOutputPortFormat extends IOutputPortFormat {
    results: Array<IResult>;
}

export interface SearchSettableOutputPortFormat extends IOutputPortFormat {
    id: number;
    url: string;
    quote: string;
    tags: Array<string>;
    updateDate: Date;
}

interface IResult {
    source_url: string,
    quote: string,
    id: number,
    ext: string,
    tags: Array<string>;
    updateDate: Date,
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
            tags: params.tags,
            updateDate: params.updateDate,
        };
        this._data.results.push(result)
    }

    get(): SearchOutputPortFormat {
        return this._data;
    }
}