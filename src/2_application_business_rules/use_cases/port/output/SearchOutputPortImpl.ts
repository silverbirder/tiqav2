import {IOutputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import path from 'path';
import {IPortDataFormat} from "../../../../1_enterprise_business_rules/use_cases/port/iPort";

export class SearchPortDataFormat implements IPortDataFormat {
    results: Array<IResult> = [];
}

interface IResult {
    "source_url": string,
    "text": string,
    "id": string,
    "ext": string,
}

export default class SearchOutputPort implements IOutputPort<IPortDataFormat> {
    private _data: SearchPortDataFormat = {"results": []};

    set(params: {id: string, url: string, text: string}) {
        const ext: string = path.extname(params.url);
        const result: IResult = {
            "source_url": params.url,
            "text": params.text,
            "id": params.id,
            "ext": ext.slice(1),
        };
        this._data.results.push(result)
    }

    get(): IPortDataFormat {
        return this._data;
    }
}