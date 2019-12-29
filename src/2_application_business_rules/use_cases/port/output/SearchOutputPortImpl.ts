import {IOutputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import path from 'path';

export interface IResults {
    results: Array<IResult>
}

interface IResult {
    "source_url": string,
    "text": string,
    "id": string,
    "ext": string,
}

export default class SearchOutputPort implements IOutputPort<IResults> {
    private readonly _results: IResults;

    constructor() {
        this._results = {
            "results": []
        };
    }

    add(id: string, url: string, text: string) {
        const ext: string = path.extname(url);
        const result: IResult = {
            "source_url": url,
            "text": text,
            "id": id,
            "ext": ext.slice(1),
        };
        this._results.results.push(result)
    }

    get(): IResults {
        return this._results;
    }
}