import {
    IHit,
    IImageObject,
    ISearchGateway,
} from '../../2_application_business_rules/gateways/iSearchGateway';
import algoliasearch, {IndexSettings, QueryParameters} from 'algoliasearch';
import {injectable} from 'inversify';
import Random from '../../utils/random';
import {SearchPortDataFormat} from '../../2_application_business_rules/use_cases/port/input/SearchInputPortImpl';

@injectable()
export class SearchGatewayImpl implements ISearchGateway {
    private alogoliaSearchIndex: algoliasearch.Index;
    private alogoliaAdminIndex: algoliasearch.Index;

    constructor() {
        const algoliaAppId: string = process.env.ALGOLIA_APP_ID || '';
        const algoliaSearchKey: string = process.env.ALGOLIA_SEARCH_KEY || '';
        const algoliaAdminKey: string = process.env.ALGOLIA_ADMIN_KEY || '';
        const algoliaIndexName: string = process.env.ALGOLIA_INDEX_NAME || '';
        if (!algoliaAppId || !algoliaSearchKey || !algoliaAdminKey || !algoliaIndexName) {
            throw new Error('Not set algolia enviroments');
        }
        const algoliaSearchClient: algoliasearch.Client = algoliasearch(algoliaAppId, algoliaSearchKey);
        const algoliaAdminClient: algoliasearch.Client = algoliasearch(algoliaAppId, algoliaAdminKey);
        this.alogoliaSearchIndex = algoliaSearchClient.initIndex(algoliaIndexName);
        this.alogoliaAdminIndex = algoliaAdminClient.initIndex(algoliaIndexName);
    }

    async search(input: SearchPortDataFormat): Promise<Array<IHit>> {
        let query: QueryParameters = {};
        let id: string = '';
        if (id = input.id, id != '') {
            const response: Partial<IHit> = await this.alogoliaSearchIndex.getObject(id);
            let hits: Array<IHit> = [{
                url: response.url || '',
                objectID: response.objectID || '',
                text: response.text || ''
            }];
            return hits;
        } else {
            query.query = input.keyword;
            const response: algoliasearch.Response<IHit> = await this.alogoliaSearchIndex.search(query);
            return response.hits;
        }
    }

    async newest(): Promise<Array<IHit>> {
        let hits: Array<IHit> = [];

        const settings: IndexSettings = await this.alogoliaAdminIndex.getSettings();
        const ranking: Array<string> = settings.ranking || [];
        let copiedRanking: Array<string> = [...ranking];
        copiedRanking.unshift('desc(update_timestamp)');
        settings.ranking = copiedRanking;
        try {
            await this.alogoliaAdminIndex.setSettings(settings);
            const response: algoliasearch.Response<IHit> = await this.alogoliaSearchIndex.search({});
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
        let response: algoliasearch.Response<IHit> = await this.alogoliaSearchIndex.search({});
        const maxHits: number = response.nbHits;
        const now: number = Date.now();
        const offSet: number = new Random(now).nextInt(1, maxHits - 1);
        let query: QueryParameters = {};
        query.offset = offSet;
        query.length = 1;
        response = await this.alogoliaSearchIndex.search(query);
        return response.hits;
    }

    async save(objects: Array<IImageObject>): Promise<any> {
        await this.alogoliaAdminIndex.addObjects(objects);
        return;
    }
}