import {
    IHit,
    IndexObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';
import algoliasearch, {IndexSettings, QueryParameters, Task} from 'algoliasearch';
import {injectable} from 'inversify';
import Random from '../../utils/random';
import {SearchInputPortDataFormat} from '../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl';

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

    async search(input: SearchInputPortDataFormat): Promise<Array<IHit>> {
        let query: QueryParameters = {};
        const id: string = input.id;
        if (id != '') {
            const response: Partial<IHit> = await this.alogoliaAdminIndex.getObject(id);
            let hits: Array<IHit> = [{
                url: response.url || '',
                objectID: response.objectID || '',
                quote: response.quote || '',
                tags: response.tags || [],
                updateDate: response!.updateDate || new Date(),
            }];
            return hits;
        } else {
            query.query = input.keyword;
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

    async save(object: IndexObject): Promise<string> {
        const task: Task = await this.alogoliaAdminIndex.addObject(object);
        return task.objectID || '';
    }
}