import {ISearch, ISearchResults} from "../application/repository/iSearch";
import algoliasearch from "algoliasearch";
export interface IImageObject {
    url: string,
    text: string
}
export class Search extends ISearch {
    private alogoliaSearchIndex: algoliasearch.Index;
    private alogoliaAdminIndex: algoliasearch.Index;
    constructor() {
        super();
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
        const response:algoliasearch.Response<ISearchResults> = await this.alogoliaSearchIndex.search(text);
        return response;
    }
    async save(objects: Array<IImageObject>): Promise<any> {
        await this.alogoliaAdminIndex.addObjects(objects);
        return;
    }
}