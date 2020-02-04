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

    function spySearch(searchGateway: ISearchGateway): void {
        // @ts-ignore
        const searchMock: jest.Spy = jest.spyOn(searchGateway.alogoliaAdminIndex, 'search');
        searchMock.mockImplementationOnce((query: any) => {
            const result: { hits: any } = {hits: []};
            const hitsData: Array<{ tag: string }> = [{tag: 'red'}, {tag: 'red'}, {tag: 'blue'}];
            const filter: Array<string> = query.facetFilters;
            for (let i = 0; i < filter.length; i++) {
                const value: string = filter[i].split(':')[1];
                for (let j = 0; j < hitsData.length; j++) {
                    if (hitsData[j].tag === value) {
                        result.hits.push(hitsData[j]);
                    }
                }
            }
            return result;
        });
    };

    function spyGetObject(searchGateway: ISearchGateway): void {
        // @ts-ignore
        const searchMock: jest.Spy = jest.spyOn(searchGateway.alogoliaAdminIndex, 'getObject');
        searchMock.mockImplementationOnce((id: string) => {
            const result: { hits: any } = {hits: []};
            const hitsData: Array<{ id: string }> = [{id: '1'}, {id: '2'}, {id: '3'}];
            for (let j = 0; j < hitsData.length; j++) {
                if (hitsData[j].id === id) {
                    result.hits.push(hitsData[j]);
                }
            }
            return result;
        });
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
            describe('Data: [tag: red], [tag: red], [tag: blue]', () => {
                it('Assert: return [tag: blue]', async () => {
                    // Arrange
                    const searchGateway: ISearchGateway = createSearchGateway();
                    spySearch(searchGateway);

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
                    spyGetObject(searchGateway);

                    // Act
                    const results: Array<ImageEntityImpl> = await searchGateway.search(1, '', []);

                    // Assert
                    expect(results).toHaveLength(1);
                });
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