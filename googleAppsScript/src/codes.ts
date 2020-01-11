const URL: string = 'https://tiqav2.work';
const SEARCH_PATH: string = '/api/search.json/';
const RANDOM_PATH: string = '/api/search/random.json';
const NEWEST_PATH: string = '/api/search/newest.json';
const TAGS_PATH: string = '/api/tags.json';
const SAVE_PATH: string = '/api/images.json';

interface IResponse {
    responseCode: number,
    parseError: boolean,
    body: Array<JSON>,
}

interface ISlackAttachment {
    color: string,
    author_name: string,
    author_link: string,
    author_icon: string,
    pretext: string,
    title: string,
    title_link: string,
    text: string,
    image_url: string,
    thumb_url: string,
    footer: string,
    ts: number,
    fields: Array<any>,
}

function doPost(e: any): any {
    const text: string = e.parameter.text;
    const splitText: Array<string> = text.split(/\s/);
    const command: string = splitText[0];
    const keyword: string = splitText[1];
    const params: any = {
        q: keyword,
    };
    const url: string = `${URL}${SEARCH_PATH}${_buildParams(params)}`;
    const response: IResponse = urlGetFetch(url);
    const now: Date = new Date();
    let attachments: Array<ISlackAttachment> = [];
    response.body.forEach((j: any) => {
        const attachment: ISlackAttachment = {
            color: "good",
            author_name: "silverbirder",
            author_link: "https://silver-birder.github.io/",
            author_icon: "https://pbs.twimg.com/profile_images/1075008669903814656/a8nmRE1o_reasonably_small.jpg",
            pretext: `Search Keywords: ${params.q}`,
            title: "Tiqav2 API Response Results",
            title_link: url,
            text: j.quote,
            image_url: j.sourceURL,
            thumb_url: j.sourceURL,
            footer: "Tiqav2 API",
            fields: [
                {
                    title: "Tags",
                    value: j.tags.join(),
                },
                {
                  titile: "Ext",
                  value: j.ext.join(),
                },
                {
                  title: "Link",
                  value: `${URL}/api/${j.id}.${j.ext[0]}`,
                },
            ],
            ts: now.getTime()
        };
        attachments.push(attachment);
    });
    const result: {} = {
        attachments: attachments
    };
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
};

const _buildParams = (params: any): any => {
    let strParams: string = '?';
    Object.keys(params).forEach((key: string) => {
        strParams += `${key}=${params[key]}&`
    });
    return strParams.slice(0, -1);
};
const urlGetFetch = (url: string): IResponse => {
    const option: {} = {
        method: 'get',
        contentType: 'application/json; charset=utf-8',
    };
    const response = UrlFetchApp.fetch(`${url}`, option);
    try {
        return {
            responseCode: response.getResponseCode(),
            parseError: false,
            body: JSON.parse(response.getContentText())
        };
    } catch (e) {
        return {
            responseCode: response.getResponseCode(),
            parseError: true,
            body: JSON.parse("[]")
        };
    }
};