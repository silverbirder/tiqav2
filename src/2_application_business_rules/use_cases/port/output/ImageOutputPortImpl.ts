import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from "../../../../1_enterprise_business_rules/use_cases/port/iPort";

export class ImagePortDataFormat implements IPortDataFormat {
    results: Array<IResult> = [];
}

interface IResult {
    'source_url': string,
    'quote': string,
    'id': string,
    'updateDate': Date,
}

export default class SaveOutputPort implements IOutputPort<IPortDataFormat> {
    private _data: ImagePortDataFormat = {results: []};

    set(params: { id: string, url: string, quote: string, updateDate: Date }) {
        const result: IResult = {
            source_url: params.url,
            quote: params.quote,
            id: params.id,
            updateDate: params.updateDate,
        };
        this._data.results.push(result)
    }

    get(): IPortDataFormat {
        return this._data.results;
    }
}