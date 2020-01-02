import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import ImageEntityImpl from '../../../../1_enterprise_business_rules/entities/imageEntityImpl';

export interface SearchOutputPortFormat extends IOutputPortFormat {
    results: Array<ViewableImageEntity>;
    extension: Array<string>;
}

export interface ViewableImageEntity {
    id: number;
    sourceURL: string;
    tags: Array<string>;
    quote: string;
    ext: Array<string>
    updateDate: string;
}

export default class SearchOutputPort implements IOutputPort<IOutputPortFormat> {
    private _data: SearchOutputPortFormat = {results: [], extension: []};

    set( entities: Array<ImageEntityImpl>) {
        const viewableEntities: Array<ViewableImageEntity> = entities.map((entity: ImageEntityImpl) => {
            const d: Date = entity.updateDate;
            const vd: string = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.toLocaleTimeString()}`;
            const q: string = entity.quote;
            const vq: string = q.length > 20 ? `${q.slice(0, 20)}...` : q;
            const v: ViewableImageEntity = {
                id: entity.id,
                sourceURL: entity.url,
                tags: entity.tags,
                quote: vq,
                ext: entity.extension,
                updateDate: vd
            };
            return v;
        });
        this._data.results = viewableEntities;
    }

    get(): SearchOutputPortFormat {
        return this._data;
    }
}