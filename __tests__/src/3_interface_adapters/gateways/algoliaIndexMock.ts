export default class AlgoliaIndexMock {
    search(query: any): any {
        const result: { hits: any, nbHits: number } = {hits: [], nbHits: 0};
        const hitsData: Array<{ tags: string }> = [{tags: 'red'}, {tags: 'red'}, {tags: 'blue'}];
        if (Object.keys(query).length === 0) {
            result.hits = hitsData;
            return result;
        }
        if (query.length === 1) {
            result.hits.push(hitsData[query.offset]);
            result.nbHits = 1;
            return result;
        }
        const filter: Array<string> = query.facetFilters;
        if (!filter) {
            result.hits = hitsData;
            return result;
        }
        for (let i = 0; i < filter.length; i++) {
            const value: string = filter[i].split(':')[1];
            for (let j = 0; j < hitsData.length; j++) {
                if (hitsData[j].tags === value) {
                    result.hits.push(hitsData[j]);
                    result.nbHits++;
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

    waitTask(i: any): void {
        return;
    }

    setSettings(s: any): any {
        return {taskID: 1};
    }

    getSettings(): any {
        return [];
    }
}