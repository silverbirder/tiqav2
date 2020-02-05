import {IPresenter} from "../../../../src/1_enterprise_business_rules/presenters/iPresenter";
import {ImagePresenterImpl} from "../../../../src/3_interface_adapters/presenters/imagePresenterImpl";
import {
    ImageOutputPortFormat,
    ImageOutputPortImpl
} from "../../../../src/2_application_business_rules/use_cases/port/output/ImageOutputPortImpl";
import {IOutputPort} from "../../../../src/1_enterprise_business_rules/use_cases/port/iOutputPort";

describe('Class: ImagePresenterImpl', () => {
    describe('Method: render', () => {
        describe('Args: binary', () => {
            it('Assert: view is binary', () => {
                // Arrange
                const presenter: IPresenter = new ImagePresenterImpl();
                const output: IOutputPort<ImageOutputPortFormat> = new ImageOutputPortImpl();
                const buff: any = 'binary';
                output.set({binary: buff});

                // Act
                presenter.render(output);

                // Assert
                expect(presenter.view).toBe('binary');
            });
        });
    });
});