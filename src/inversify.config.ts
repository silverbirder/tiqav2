import {TYPES} from '@src/types';

import {Container} from 'inversify';

import {IPresenter} from '@src/1_enterprise_business_rules/presenters/iPresenter';
import {IUseCase} from '@src/1_enterprise_business_rules/use_cases/iUseCase';

import {IImageGateway} from '@src/2_application_business_rules/gateways/iImageGateway';
import {IImageTextGateway} from '@src/2_application_business_rules/gateways/iImageTextGateway';
import {IController} from '@src/2_application_business_rules/controllers/iController';
import {ISearchGateway} from '@src/2_application_business_rules/gateways/iSearchGateway';
import {SearchNormalInteractorImpl} from '@src/2_application_business_rules/use_cases/searchNormalInteractorImpl';
import {SaveImageInteractorImpl} from '@src/2_application_business_rules/use_cases/saveImageInteractorImpl';
import {SearchNewestInteractorImpl} from '@src/2_application_business_rules/use_cases/searchNewestInteractorImpl';
import {SearchRandomInteractorImpl} from '@src/2_application_business_rules/use_cases/searchRandomInteractorImpl';
import {SearchTagsInteractorImpl} from '@src/2_application_business_rules/use_cases/searchTagsInteractorImpl';
import {GetImageInteractorImpl} from '@src/2_application_business_rules/use_cases/getImageInteractorImpl';

import {ImageGatewayImpl} from '@src/3_interface_adapters/gateways/imageGatewayImpl';
import {ImageTextGatewayImpl} from '@src/3_interface_adapters/gateways/imageTextGatewayImpl';
import {SearchGatewayImpl} from '@src/3_interface_adapters/gateways/searchGatewayImpl';
import {TagsPresenterImpl} from '@src/3_interface_adapters/presenters/tagsPresenterImpl';
import {SearchControllerImpl} from '@src/3_interface_adapters/controllers/searchControllerImpl';
import {ImageControllerImpl} from '@src/3_interface_adapters/controllers/imageControllerImpl';
import {TagsControllerImpl} from '@src/3_interface_adapters/controllers/tagsControllerImpl';
import {ImagePresenterImpl} from '@src/3_interface_adapters/presenters/imagePresenterImpl';
import {SearchPresenterImpl} from '@src/3_interface_adapters/presenters/searchPresenterImpl';

const container = new Container();

container.bind<IImageGateway>(TYPES.ImageGateway).to(ImageGatewayImpl);
container.bind<IImageTextGateway>(TYPES.ImageTextGateway).to(ImageTextGatewayImpl);
container.bind<ISearchGateway>(TYPES.SearchGateway).to(SearchGatewayImpl);

container.bind<IPresenter>(TYPES.SearchPresenter).to(SearchPresenterImpl);
container.bind<IPresenter>(TYPES.ImagePresenter).to(ImagePresenterImpl);
container.bind<IPresenter>(TYPES.TagsPresenter).to(TagsPresenterImpl);

container.bind<IUseCase>(TYPES.SearchNormalUseCase).to(SearchNormalInteractorImpl);
container.bind<IUseCase>(TYPES.SearchNewestUseCase).to(SearchNewestInteractorImpl);
container.bind<IUseCase>(TYPES.SearchRandomUseCase).to(SearchRandomInteractorImpl);
container.bind<IUseCase>(TYPES.SearchTagUseCase).to(SearchTagsInteractorImpl);
container.bind<IUseCase>(TYPES.SaveImageUseCase).to(SaveImageInteractorImpl);
container.bind<IUseCase>(TYPES.GetImageUseCase).to(GetImageInteractorImpl);

container.bind<IController>(TYPES.SearchController).to(SearchControllerImpl);
container.bind<IController>(TYPES.ImageController).to(ImageControllerImpl);
container.bind<IController>(TYPES.TagsController).to(TagsControllerImpl);


export {container};