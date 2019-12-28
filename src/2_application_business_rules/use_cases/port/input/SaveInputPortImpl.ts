import {IInputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iInputPort";

export default class SaveInputPortImpl implements IInputPort<string>{
    private readonly _url: string;

    constructor(url: string) {
        this._url = url;
    }

    get(): string {
        return this._url;
    }
}