import IEntity from './iEntity';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {IDate} from '../../utils/date';

@injectable()
export default class ImageEntityImpl implements IEntity {
    id: number;
    url: string;
    quote: string;
    tags: Array<string>;
    extension: Array<string>;
    updateDate: Date;
    private readonly dateImpl: IDate;

    constructor(
        params: any,
        @inject(TYPES.DATE) dateImpl: IDate
    ) {
        this.dateImpl = dateImpl;
        this.id = parseInt(params.objectID) || 0;
        this.url = params.url || '';
        this.quote = params.quote || '';
        this.tags = params.tags || [];
        this.extension = params.extension || [];
        this.updateDate = dateImpl.create(params.updateDate) || dateImpl.create();
    }

    static SORT_KRY: string = 'updateDate';
    static FILTER_KEY: string = 'tags';
}