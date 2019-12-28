import {IPresenter} from "../../2_application_business_rules/presenters/iPresenter";
import {injectable} from "inversify";

@injectable()
export default class PresenterImpl implements IPresenter {
    invoke(data: any): any {
        return data
    }
}