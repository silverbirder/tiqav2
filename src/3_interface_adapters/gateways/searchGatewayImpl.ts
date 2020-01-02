import {
    IHit, IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';
import algoliasearch, {IndexSettings, QueryParameters, Task} from 'algoliasearch';
import {injectable} from 'inversify';
import Random from '../../utils/random';
import ImageEntityImpl from "../../1_enterprise_business_rules/entities/imageEntityImpl";

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
        const ranking: Array<string> = settings.ranking || [];
        let copiedRanking: Array<string> = [...ranking];
        copiedRanking.unshift(`desc(${ImageEntityImpl.SORT_KRY})`);
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
        return hits.map((hit: IHit) => {
            return new ImageEntityImpl(hit);
        });
    }

    async random(): Promise<Array<ImageEntityImpl>> {
        let response: algoliasearch.Response<IHit> = await this.alogoliaAdminIndex.search({});
        const maxHits: number = response.nbHits;
        const now: number = Date.now();
        const offSet: number = new Random(now).nextInt(1, maxHits - 1);
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