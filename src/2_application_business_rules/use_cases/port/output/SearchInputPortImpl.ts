import {IOutputPort} from "../../../../1_enterprise_business_rules/use_cases/port/iOutputPort";
import {ISearchResults} from "../../../gateways/iSearchGateway";

export default class SearchOutputPort implements IOutputPort<ISearchResults> {
    private readonly _result: ISearchResults;

    constructor(result: ISearchResults) {
        this._result = result;
    }

    get(): ISearchResults {
        return this._result;
    }
}