import {TYPES} from "./types";
import {IImageGateway} from "./2_application_business_rules/gateways/iImageGateway";
import {ImageGatewayImpl} from "./3_interface_adapters/gateways/imageGatewayImpl";
import {Container} from "inversify";
import {IImageTextGateway} from "./2_application_business_rules/gateways/iImageTextGateway";
import {ImageTextGatewayImpl} from "./3_interface_adapters/gateways/imageTextGatewayImpl";
import {ISearchGateway} from "./2_application_business_rules/gateways/iSearchGateway";
import {SearchGatewayImpl} from "./3_interface_adapters/gateways/searchGatewayImpl";
import {IPresenter} from "./2_application_business_rules/presenters/iPresenter";
import PresenterImpl from "./3_interface_adapters/presenters/presenterImpl";
import SearchUseCaseImpl from "./2_application_business_rules/use_cases/searchUseCaseImpl";
import {IUseCase} from "./1_enterprise_business_rules/use_cases/iUseCase";
import SaveUseCaseImpl from "./2_application_business_rules/use_cases/saveUseCaseImpl";
import {IController} from "./2_application_business_rules/controllers/iController";
import SearchControllerImpl from "./3_interface_adapters/controllers/searchControllerImpl";
import SaveControllerImpl from "./3_interface_adapters/controllers/saveControllerImpl";

const container = new Container();

container.bind<IImageGateway>(TYPES.ImageGateway).to(ImageGatewayImpl);
container.bind<IImageTextGateway>(TYPES.ImageTextGateway).to(ImageTextGatewayImpl);
container.bind<ISearchGateway>(TYPES.SearchGateway).to(SearchGatewayImpl);

container.bind<IPresenter>(TYPES.Presenter).to(PresenterImpl);

container.bind<IUseCase>(TYPES.SearchUseCase).to(SearchUseCaseImpl);
container.bind<IUseCase>(TYPES.SaveUseCase).to(SaveUseCaseImpl);

container.bind<IController>(TYPES.SearchController).to(SearchControllerImpl);
container.bind<IController>(TYPES.SaveController).to(SaveControllerImpl);

export {container};