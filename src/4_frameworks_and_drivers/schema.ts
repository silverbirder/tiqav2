import {param, query, sanitizeQuery} from 'express-validator';

import {IRequest} from '@src/2_application_business_rules/controllers/iController';

const querySchema = [
    query(['q', 'quote', 'tags', 'url', 'si']).trim(),
    sanitizeQuery('tags').customSanitizer((value: string) => {
        if (typeof value !== 'string' || value.length === 0) {
            return [];
        }
        return value.split(',');
    }),
    sanitizeQuery('si').customSanitizer((value: string) => {
        if (typeof value === 'string' && value === '1') {
            return true;
        } else {
            return false;
        }
    }),
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
    savedImage: boolean;
    id: number;
    extension: string;

    constructor(param: any, query: any) {
        this.keyword = query.q || '';
        this.quote = query.quote || '';
        this.tags = query.tags || [];
        this.url = query.url || '';
        this.savedImage = query.si || false;
        this.id = param.id || 0;
        this.extension = param.ext || '';
    }
}

export {querySchema, paramSchema, CustomRequest}