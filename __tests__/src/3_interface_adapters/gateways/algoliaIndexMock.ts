export default class AlgoliaIndexMock {
    search(query: any): any {
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
    }

    getObject(id: string): any {
        const result: { hits: any } = {hits: []};
        const hitsData: Array<{ id: string }> = [{id: '1'}, {id: '2'}, {id: '3'}];
        for (let j = 0; j < hitsData.length; j++) {
            if (hitsData[j].id === id) {
                result.hits.push(hitsData[j]);
            }
        }
        return result;
    }

    waitTask(): any {

    }

    setSettings(): any {

    }

    getSettings(): any {

    }
}