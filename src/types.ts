const TYPES = {
    ImageGateway: Symbol.for('ImageGateway'),
    ImageTextGateway: Symbol.for('ImageTextGateway'),
    SearchGateway: Symbol.for('SearchGateway'),
    SearchPresenter: Symbol.for('SearchPresenter'),
    ImagePresenter: Symbol.for('ImagePresenter'),
    TagsPresenter: Symbol.for('Presenter'),
    SearchNormalUseCase: Symbol.for('SearchNormalUseCase'),
    SearchNewestUseCase: Symbol.for('SearchNewestUseCase'),
    SearchRandomUseCase: Symbol.for('SearchRandomUseCase'),
    SearchTagUseCase: Symbol.for('SearchTagUseCase'),
    SaveImageUseCase: Symbol.for('SaveImageUseCase'),
    GetImageUseCase: Symbol.for('GetImageUseCase'),
    SearchController: Symbol.for('SearchController'),
    ImageController: Symbol.for('ImageController'),
    TagsController: Symbol.for('TagsController'),
};

export {TYPES};