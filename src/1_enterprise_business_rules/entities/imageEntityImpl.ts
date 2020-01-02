import IEntity from './iEntity';

export default class ImageEntityImpl implements IEntity {
    id: number;
    url: string;
    quote: string;
    tags: Array<string>;
    extension: Array<string>;
    updateDate: Date;

    constructor(params: any) {
        this.id = parseInt(params.objectID) || 0;
        this.url = params.url || '';
        this.quote = params.quote || '';
        this.tags = params.tags || [];
        this.extension = params.extension || [];
        this.updateDate = new Date(params.updateDate) || new Date();
    }

    static SORT_KRY: string = 'updateDate';
    static FILTER_KEY: string = 'tags';
}