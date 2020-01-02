import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import ImageEntityImpl from "../../../../1_enterprise_business_rules/entities/imageEntityImpl";

export interface SearchOutputPortFormat extends IOutputPortFormat {
    results: Array<IResult>;
    extension: Array<string>;
}

interface IResult {
    source_url: string,
    quote: string,
    id: number,
    tags: Array<string>;
    updateDate: Date,
}

export default class SearchOutputPort implements IOutputPort<IOutputPortFormat> {
    private _data: SearchOutputPortFormat = {results: [], extension: []};

    set(params: {entities: Array<ImageEntityImpl>, extension: Array<string>}) {
        params.entities.forEach((entity: ImageEntityImpl) => {
            const result: IResult = {
                source_url: entity.url,
                quote: entity.quote,
                id: entity.id,
                tags: entity.tags,
                updateDate: entity.updateDate,
            };
            this._data.results.push(result)
        });
        this._data.extension = params.extension;
    }

    get(): SearchOutputPortFormat {
        return this._data;
    }
}