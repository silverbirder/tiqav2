import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import path from 'path';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class SearchPortDataFormat implements IPortDataFormat {
    results: Array<IResult> = [];
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': string,
    'ext': string,
    'updateDate': Date,
}

export default class SearchOutputPort implements IOutputPort<IPortDataFormat> {
    data: SearchPortDataFormat = {results: []};

    set(params: {id: string, url: string, quote: string, updateDate: Date}) {
        const ext: string = path.extname(params.url);
        const result: IResult = {
            source_url: params.url,
            quote: params.quote,
            id: params.id,
            ext: ext.slice(1),
            updateDate: params.updateDate,
        };
        this.data.results.push(result)
    }

    get(): IPortDataFormat {
        return this.data;
    }
}