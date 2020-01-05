import {IUseCase} from "@src/1_enterprise_business_rules/use_cases/iUseCase";
import {GetImageInteractorImpl} from "@src/2_application_business_rules/use_cases/getImageInteractorImpl";
import {container} from "@src/inversify.config";
import {TYPES} from "@src/types";
import {ISearchGateway} from "@src/2_application_business_rules/gateways/iSearchGateway";

describe('invoke', () => {
    describe('Args: EmptyObject', () => {
        it('', () => {
            container.get<ISearchGateway>(TYPES.SearchGateway);
            // const interactor: IUseCase = new GetImageInteractorImpl();
        });
    });
})