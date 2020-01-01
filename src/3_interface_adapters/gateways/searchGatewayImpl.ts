import {
    IHit,
    IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';
import algoliasearch, {IndexSettings, QueryParameters, Task} from 'algoliasearch';
import {injectable} from 'inversify';
import Random from '../../utils/random';

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
    }

    async search(id: number, keyword: string): Promise<Array<IHit>> {
        let query: QueryParameters = {};
        if (id != 0) {
            const response: Partial<IHit> = await this.alogoliaAdminIndex.getObject(id.toString());
            let hits: Array<IHit> = [{
                url: response.url || '',
                objectID: response.objectID || 0,
                quote: response.quote || '',
                tags: response.tags || [],
                updateDate: response!.updateDate || new Date(),
            }];
            return hits;
        } else {
            query.query = keyword;
            const response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search(query);
            return response.hits;
        }
    }

    async newest(): Promise<Array<IHit>> {
        let hits: Array<IHit> = [];

        const settings: IndexSettings = await this.alogoliaAdminIndex.getSettings();
        const ranking: Array<string> = settings.ranking || [];
        let copiedRanking: Array<string> = [...ranking];
        copiedRanking.unshift('desc(updateDate)');
        settings.ranking = copiedRanking;
        try {
            await this.alogoliaAdminIndex.setSettings(settings);
            const response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search({});
            hits = response.hits;
        } catch (e) {
            console.error(e);
        } finally {
            settings.ranking = ranking;
            await this.alogoliaAdminIndex.setSettings(settings);
        }
        return hits;
    }

    async random(): Promise<Array<IHit>> {
        let response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search({});
        const maxHits: number = response.nbHits;
        const now: number = Date.now();
        const offSet: number = new Random(now).nextInt(1, maxHits - 1);
        let query: QueryParameters = {};
        query.offset = offSet;
        query.length = 1;
        response = await this.alogoliaAdminIndex.search(query);
        return response.hits;
    }

    async save(object: IndexObject): Promise<number> {
        const task: Task = await this.alogoliaAdminIndex.addObject(object);
        return parseInt(task.objectID || '0');
    }

    async tags(id: number, keyword: string): Promise<Array<string>> {
        if (id !== 0) {
            const response: Partial<IHit> = await this.alogoliaAdminIndex.getObject(id.toString());
            const tags: Array<string> = response.tags || [];
            let uniqTags: Array<string> = Array.from(new Set(tags));
            return uniqTags;
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
            let uniqTags: Array<string> = Array.from(new Set(stackTags));
            return uniqTags;
        }
    }
}