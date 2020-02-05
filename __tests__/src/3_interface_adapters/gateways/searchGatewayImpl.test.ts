import {SearchGatewayImpl} from "../../../../src/3_interface_adapters/gateways/searchGatewayImpl";
import {ISearchGateway} from "../../../../src/2_application_business_rules/gateways/iSearchGateway";
import {ImageEntityImpl} from "../../../../src/1_enterprise_business_rules/entities/imageEntityImpl";
import AlgoliaIndexMock from "./algoliaIndexMock";

describe('Class: SearchGatewayImpl', () => {
    beforeEach(() => {
        setEnv();
    });
    afterEach(() => {
        unSetEnv();
    });

    function createSearchGateway(): ISearchGateway {
        const searchGateway: ISearchGateway = new SearchGatewayImpl();
        // @ts-ignore
        searchGateway.alogoliaAdminIndex = new AlgoliaIndexMock();
        return searchGateway;
    };

    function setEnv(): void {
        process.env.ALGOLIA_APP_ID = 'ALGOLIA_APP_ID';
        process.env.ALGOLIA_ADMIN_KEY = 'ALGOLIA_ADMIN_KEY';
        process.env.ALGOLIA_INDEX_NAME = 'ALGOLIA_INDEX_NAME';
    };

    function unSetEnv(): void {
        delete process.env.ALGOLIA_APP_ID;
        delete process.env.ALGOLIA_ADMIN_KEY;
        delete process.env.ALGOLIA_INDEX_NAME;
    };

    describe('Method: constructor', () => {
        describe('Env: no env', () => {
            it('Assert: Error', () => {
                // Arrange
                unSetEnv();

                // Act & Assert
                expect(createSearchGateway).toThrow();
            });
        });
        describe('Env: Needed env', () => {
            it('Assert: Not Error', () => {
                // Arrange
                setEnv();

                // Act & Assert
                expect(createSearchGateway).not.toThrow();
            });
        });
    });
    describe('Method: search', () => {
        describe('Args: tags [blue]', () => {
            describe('Data: [tags: red], [tags: red], [tags: blue]', () => {
                it('Assert: return [tags: blue]', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();

                    // Act
                    const results: Array<ImageEntityImpl> = await searchGateway.search(0, '', ['blue']);

                    // Assert
                    expect(results).toHaveLength(1);
                });
            });
        });
        describe('Args: id 1', () => {
            describe('Data: [id: 1], [id: 2], [id: 3]', () => {
                it('Assert: return [id: 1]', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();

                    // Act
                    const results: Array<ImageEntityImpl> = await searchGateway.search(1, '', []);

                    // Assert
                    expect(results).toHaveLength(1);
                });
            });
        });
    });
    describe('Method: newest', () => {
        describe('Args: No', () => {
            describe('Data: [id: 1], [id: 2], [id: 3]', () => {
                it('Assert: return all data', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();

                    // Act
                    const results: Array<ImageEntityImpl> = await searchGateway.newest();

                    // Assert
                    expect(results).toHaveLength(3);
                });
            });
        });
    });
    describe('Method: random', () => {
        describe('Args: No', () => {
            describe('Data: [id: 1], [id: 2], [id: 3]', () => {
                it('Assert: return single data', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();

                    // Act
                    const results: Array<ImageEntityImpl> = await searchGateway.random();

                    // Assert
                    expect(results).toHaveLength(1);
                });
            });
        });
    });
    describe('Method: tags', () => {
        describe('Args: No', () => {
            describe('Data: [tags: red], [tags: red], [tags: blue]', () => {
                it('Assert: return 2 [tags: red, blue]', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();

                    // Act
                    const results: Array<string> = await searchGateway.tags(0, '');

                    // Assert
                    expect(results).toHaveLength(2);
                });
            });
        });
    });
});