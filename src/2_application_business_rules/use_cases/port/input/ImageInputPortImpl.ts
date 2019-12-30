import {IInputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iInputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImagePortDataFormat implements IPortDataFormat {
    url: string = '';
    id: string = '';
    tags: Array<string> = [];
    quote: string = '';
}

export default class ImageInputPortImpl implements IInputPort<IPortDataFormat> {
    data: ImagePortDataFormat = {url: '', id: '', tags: [], quote: ''};

    set(params: {url: string, id: string, tags: string, quote: string}) {
        if (params.url != '') {
            this.data.url = params.url;
        }
        if (params.tags != '') {
            this.data.tags = params.tags.split(',');
        }
        if (params.quote != '') {
            this.data.quote = params.quote;
        }
    }

    get(): IPortDataFormat {
        return this.data;
    }
}