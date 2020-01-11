const URL: string = 'https://tiqav2.work';
const SEARCH_PATH: string = '/api/search.json/';
const RANDOM_PATH: string = '/api/search/random.json';
const NEWEST_PATH: string = '/api/search/newest.json';
const TAGS_PATH: string = '/api/tags.json';
const SAVE_PATH: string = '/api/images.json';

interface IResponse {
    responseCode: number,
    parseError: boolean,
    body: JSON,
    bodyText: string,
}
interface ISlackAttachment {
    color: string,
    pretext: string,
    title: string,
    title_link: string,
    text: string,
    image_url: string,
    thumb_url: string,
    footer: string,
}

function search(): any {
    const params: {} = {
      q: 'LGTM',
    };
    const response: IResponse = urlGetFetch(`${URL}${SEARCH_PATH}`, params);
    Logger.log(response.body);
};

const urlGetFetch = (url:string, params: any): IResponse => {
    const option: {} = {
      method: 'get',
      contentType: 'application/json; charset=utf-8',
    };
    let strParams: string = '?';
    for (let key in params) {
        strParams = `${strParams}${key}=${params[key]}&`
    }
    strParams = strParams.slice(0, -1);
    const response = UrlFetchApp.fetch(`${url}${strParams}`, option);
    try {
        return {
            responseCode : response.getResponseCode(),
            parseError : false,
            body : JSON.parse(response.getContentText()),
            bodyText : response.getContentText()
        };
    } catch(e) {
        return {
            responseCode : response.getResponseCode(),
            parseError : true,
            body : JSON.parse(''),
            bodyText : response.getContentText()
        };
    }
};