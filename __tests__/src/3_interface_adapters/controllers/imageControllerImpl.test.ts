import {container} from "@src/inversify.config";
import {TYPES} from "@src/types";
import {IUseCase} from "@src/1_enterprise_business_rules/use_cases/iUseCase";
import {IMAGE_TYPES, ImageControllerImpl} from "@src/3_interface_adapters/controllers/imageControllerImpl";
import {IController, IRequest} from "@src/2_application_business_rules/controllers/iController";
import {GetImageInteractorMock} from "@src/2_application_business_rules/use_cases/getImageInteractorMock";
import {SaveImageInteractorMock} from "@src/2_application_business_rules/use_cases/saveImageInteractorMock";

describe('Class: ImageControllerImpl', () => {
    describe('Method: run', () => {
        let controller: IController;
        beforeEach(() => {
            container.snapshot();
            container.rebind<IUseCase>(TYPES.SaveImageUseCase).to(SaveImageInteractorMock);
            container.rebind<IUseCase>(TYPES.GetImageUseCase).to(GetImageInteractorMock);
            const saveImageUseCase: IUseCase = container.get<IUseCase>(TYPES.SaveImageUseCase);
            const getImageUseCase: IUseCase = container.get<IUseCase>(TYPES.GetImageUseCase);
            controller = new ImageControllerImpl(saveImageUseCase, getImageUseCase);
        });
        afterEach(() => {
            container.restore();
        });
        describe('Args: default IRequest', () => {
            // Arrange
            const q: IRequest = {
                keyword: '',
                quote: '',
                tags: [],
                url: '',
                id: 1,
                savedImage: false,
                extension: '',
            };
            describe('Set: useCaseType = IMAGE_TYPES.SAVE', () => {
                it('Assert: useCase = SaveImageUseCase', () => {
                    // Arrange
                    controller.useCaseType = IMAGE_TYPES.SAVE;

                    // Act
                    controller.run(q);

                    // Assert
                    expect(controller.useCase).toBeInstanceOf(SaveImageInteractorMock);
                });
            });
            describe('Set: useCaseType = IMAGE_TYPES.VIEW', () => {
                it('Assert: useCase = GetImageUseCase', () => {
                    // Arrange
                    controller.useCaseType = IMAGE_TYPES.VIEW;

                    // Act
                    controller.run(q);

                    // Assert
                    expect(controller.useCase).toBeInstanceOf(GetImageInteractorMock);
                });
            });
        });
    });
});