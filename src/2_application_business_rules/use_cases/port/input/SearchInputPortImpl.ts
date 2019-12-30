import {IInputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iInputPort";
import {IPortDataFormat} from "../../../../1_enterprise_business_rules/use_cases/port/iPort";

export class SearchPortDataFormat implements IPortDataFormat {
    keyword: string = "";
    id: string = "";
}

export default class SearchInputPortImpl implements IInputPort<IPortDataFormat> {
    private _data: SearchPortDataFormat = {"keyword": "", "id": ""};

    set(params: { q: string, id: string }) {
        if (params.q) {
            this._data.keyword = params.q;
        }
        if (params.id) {
            this._data.id = params.id;
        }
    }

    get(): IPortDataFormat {
        return this._data;
    }
}