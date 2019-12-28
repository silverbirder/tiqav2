import {IImageObject, ISearchGateway, ISearchResults} from "../../2_application_business_rules/gateways/iSearchGateway";
import algoliasearch from "algoliasearch";
import {injectable} from "inversify";

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

    async search(text: string): Promise<ISearchResults> {
        const response: algoliasearch.Response<ISearchResults> = await this.alogoliaSearchIndex.search(text);
        return response;
    }

    async save(objects: Array<IImageObject>): Promise<any> {
        await this.alogoliaAdminIndex.addObjects(objects);
        return;
    }
}