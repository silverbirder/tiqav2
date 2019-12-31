import {TYPES} from './types';
import {IImageGateway} from './2_application_business_rules/gateways/iImageGateway';
import {ImageGatewayImpl} from './3_interface_adapters/gateways/imageGatewayImpl';
import {Container} from 'inversify';
import {IImageTextGateway} from './2_application_business_rules/gateways/iImageTextGateway';
import {ImageTextGatewayImpl} from './3_interface_adapters/gateways/imageTextGatewayImpl';
import {ISearchGateway} from './2_application_business_rules/gateways/iSearchGateway';
import {SearchGatewayImpl} from './3_interface_adapters/gateways/searchGatewayImpl';
import {IPresenter} from './1_enterprise_business_rules/presenters/iPresenter';
import PresenterImpl from './3_interface_adapters/presenters/presenterImpl';
import SearchNormalInteractorImpl from './2_application_business_rules/use_cases/searchNormalInteractorImpl';
import {IUseCase} from './1_enterprise_business_rules/use_cases/iUseCase';
import SaveImageInteractorImpl from './2_application_business_rules/use_cases/saveImageInteractorImpl';
import {IController} from './2_application_business_rules/controllers/iController';
import SearchControllerImpl from './3_interface_adapters/controllers/searchControllerImpl';
import ImageControllerImpl from './3_interface_adapters/controllers/imageControllerImpl';
import SearchNewestInteractorImpl from './2_application_business_rules/use_cases/searchNewestInteractorImpl';
import SearchRandomInteractorImpl from './2_application_business_rules/use_cases/searchRandomInteractorImpl';
import ImageUrlControllerImpl from './3_interface_adapters/controllers/imageUrlControllerImpl';
import GetImageBinaryInteractorImpl from './2_application_business_rules/use_cases/getImageBinaryInteractorImpl';
import TagsControllerImpl from './3_interface_adapters/controllers/tagsControllerImpl';
import SearchTagsInteractorImpl from './2_application_business_rules/use_cases/searchTagsInteractorImpl';

const container = new Container();

container.bind<IImageGateway>(TYPES.ImageGateway).to(ImageGatewayImpl);
container.bind<IImageTextGateway>(TYPES.ImageTextGateway).to(ImageTextGatewayImpl);
container.bind<ISearchGateway>(TYPES.SearchGateway).to(SearchGatewayImpl);

container.bind<IPresenter>(TYPES.Presenter).to(PresenterImpl);

container.bind<IUseCase>(TYPES.SearchNormalUseCase).to(SearchNormalInteractorImpl);
container.bind<IUseCase>(TYPES.SearchNewestUseCase).to(SearchNewestInteractorImpl);
container.bind<IUseCase>(TYPES.SearchRandomUseCase).to(SearchRandomInteractorImpl);
container.bind<IUseCase>(TYPES.SearchTagUseCase).to(SearchTagsInteractorImpl);
container.bind<IUseCase>(TYPES.SaveImageUseCase).to(SaveImageInteractorImpl);
container.bind<IUseCase>(TYPES.GetImageBinaryUseCase).to(GetImageBinaryInteractorImpl);

container.bind<IController>(TYPES.SearchController).to(SearchControllerImpl);
container.bind<IController>(TYPES.ImageController).to(ImageControllerImpl);
container.bind<IController>(TYPES.ImageUrlController).to(ImageUrlControllerImpl);
container.bind<IController>(TYPES.TagsController).to(TagsControllerImpl);

export {container};