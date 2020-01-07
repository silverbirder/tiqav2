import algoliasearch, {IndexSettings, QueryParameters, Task} from 'algoliasearch';
import {injectable} from 'inversify';

import {Random} from '@src/utils/random';

import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

import {IHit, IndexObject, ISearchGateway,} from '@src/2_application_business_rules/gateways/iSearchGateway';

const settings: IndexSettings = {
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    hitsPerPage: 20,
    maxValuesPerFacet: 100,
    attributesToIndex: [ 'unordered(quote)' ],
    attributesForFaceting: [ 'tags' ],
    paginationLimitedTo: 1000,
    exactOnSingleWordQuery: 'attribute',
    ranking: [
        'typo',
        'geo',
        'words',
        'filters',
        'proximity',
        'attribute',
        'exact',
        'custom'
    ],
    separatorsToIndex: '',
    removeWordsIfNoResults: 'none',
    queryType: 'prefixLast',
    highlightPreTag: '<em>',
    highlightPostTag: '</em>',
    snippetEllipsisText: '',
    alternativesAsExact: [ 'ignorePlurals', 'singleWordSynonym' ]
};

@injectable()
export class SearchGatewayImpl implements ISearchGateway {
    private alogoliaAdminIndex: algoliasearch.Index;

    constructor() {
        const algoliaAppId: string = process.env.ALGOLIA_APP_ID || '';
        const algoliaAdminKey: string = process.env.ALGOLIA_ADMIN_KEY || '';
        const algoliaIndexName: string = process.env.ALGOLIA_INDEX_NAME || '';
        if (!algoliaAppId || !algoliaAdminKey || !algoliaIndexName) {
            throw new Error('Not set algolia enviroments');
        }
        const algoliaAdminClient: algoliasearch.Client = algoliasearch(algoliaAppId, algoliaAdminKey);
        this.alogoliaAdminIndex = algoliaAdminClient.initIndex(algoliaIndexName);
        this.algoliaSettings();
    }

    private async algoliaSettings(): Promise<void>{
        const task: Task = await this.alogoliaAdminIndex.setSettings(settings);
        await this.alogoliaAdminIndex.waitTask(task.taskID);
    }

    async search(id: number, keyword: string, tags: Array<string>): Promise<Array<ImageEntityImpl>> {
        let query: QueryParameters = {};
        if (id != 0) {
            const response: any = await this.alogoliaAdminIndex.getObject(id.toString());
            const entity: ImageEntityImpl = new ImageEntityImpl(response);
            return [entity];
        } else {
            query.query = keyword;
            query.facetFilters = tags.map((tag: string) => {
                return `${ImageEntityImpl.FILTER_KEY}:${tag}`;
            });
            const response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search(query);
            return response.hits.map((hit: IHit) => {
                return new ImageEntityImpl(hit);
            });
        }
    }

    async newest(): Promise<Array<ImageEntityImpl>> {
        let hits: Array<IHit> = [];

        const settings: IndexSettings = await this.alogoliaAdminIndex.getSettings();
        try {
            const task: Task = await this.alogoliaAdminIndex.setSettings({'customRanking': [`desc(${ImageEntityImpl.SORT_KRY})`]});
            await this.alogoliaAdminIndex.waitTask(task.taskID);
            const response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search({});
            hits = response.hits;
        } catch (e) {
            console.error(e);
        } finally {
            const task: Task = await this.alogoliaAdminIndex.setSettings(settings);
            await this.alogoliaAdminIndex.waitTask(task.taskID);
        }
        return hits.map((hit: IHit) => {
            return new ImageEntityImpl(hit);
        });
    }

    async random(): Promise<Array<ImageEntityImpl>> {
        let response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search({});
        const maxHits: number = response.nbHits == 0 ?  1: response.nbHits;
        const now: number = Date.now();
        const offSet: number = new Random(now).nextInt(0, maxHits - 1);
        let query: QueryParameters = {};
        query.offset = offSet;
        query.length = 1;
        response = await this.alogoliaAdminIndex.search(query);
        return response.hits.map((hit: IHit) => {
            return new ImageEntityImpl(hit);
        });
    }

    async save(object: IndexObject): Promise<number> {
        const task: Task = await this.alogoliaAdminIndex.addObject(object);
        return parseInt(task.objectID || '0');
    }

    async tags(id: number, keyword: string): Promise<Array<string>> {
        if (id !== 0) {
            const response: Partial<IHit> = await this.alogoliaAdminIndex.getObject(id.toString());
            const tags: Array<string> = response.tags || [];
            return  Array.from(new Set(tags));
        } else {
            let query: QueryParameters = {};
            query.query = keyword;
            const response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search(query);
            const hits: Array<IHit> = response.hits;
            let stackTags: Array<string> = [];
            hits.forEach((hit: IHit) => {
                if (typeof hit.tags === 'undefined') {
                    return;
                }
                if (hit.tags.length === 0) {
                    return;
                }
                stackTags = stackTags.concat(hit.tags);
            });
            return Array.from(new Set(stackTags));
        }
    }
}