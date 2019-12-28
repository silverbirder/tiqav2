import {IInputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iInputPort";

export default class SearchInputPortImpl implements IInputPort<string> {
    private readonly _keyword: string;

    constructor(keyword: string) {
        this._keyword = keyword;
    }

    get(): string {
        return this._keyword;
    }
}