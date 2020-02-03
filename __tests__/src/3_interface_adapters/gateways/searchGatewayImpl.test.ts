import {SearchGatewayImpl} from "../../../../src/3_interface_adapters/gateways/searchGatewayImpl";
import {ISearchGateway} from "../../../../src/2_application_business_rules/gateways/iSearchGateway";
import {ImageEntityImpl} from "../../../../src/1_enterprise_business_rules/entities/imageEntityImpl";


describe('Class: SearchGatewayImpl', () => {
    beforeEach(() => {
        setEnv();
    });
    afterEach(() => {
        unSetEnv();
    });

    function createSearchGateway(): ISearchGateway {
        return new SearchGatewayImpl();
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
        describe('Args: No', () => {
            it('Assert: No results', async () => {
                // Arrange
                const searchGateway: ISearchGateway = createSearchGateway();
                // @ts-ignore
                const searchMock: jest.Spy = jest.spyOn(searchGateway.alogoliaAdminIndex, 'search');
                searchMock.mockImplementationOnce(() => {
                    return {hits: []}
                });

                // Act
                const results: Array<ImageEntityImpl> = await searchGateway.search(0, '', []);

                // Assert
                // TBD
            });
        });
    });
    describe('Method: newest', () => {
        describe('Args:', () => {
            it('Assert:', () => {

            });
        });
    });
    describe('Method: random', () => {
        describe('Args:', () => {
            it('Assert:', () => {

            });
        });
    });
    describe('Method: tags', () => {
        describe('Args:', () => {
            it('Assert:', () => {

            });
        });
    });
});