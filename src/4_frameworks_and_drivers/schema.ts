import {check, param, query, sanitizeQuery} from 'express-validator';
import {IRequest} from '../2_application_business_rules/controllers/iController';

const querySchema = [
    query(['q', 'quote', 'tags', 'url']).trim(),
    sanitizeQuery('tags').customSanitizer((value: string) => {
        if (typeof value !== 'string' || value.length === 0) {
            return [];
        }
        return value.split(',');
    }),
    check('url').isURL(),
];

const paramSchema = [
    param(['id', 'ext']).trim().escape(),
    param('id').toInt(),
];

class CustomRequest implements IRequest {
    keyword: string;
    quote: string;
    tags: Array<string>;
    url: string;
    id: number;
    extension: string;

    constructor(param: any, query: any) {
        this.keyword = query.q || '';
        this.quote = query.quote || '';
        this.tags = query.tags || [];
        this.url = query.url || '';
        this.id = param.id || 0;
        this.extension = param.ext || '';
    }
}

export {querySchema, paramSchema, CustomRequest}