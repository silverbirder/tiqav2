import {IOutputPort} from '../use_cases/port/iOutputPort';
import {IPortFormat} from '../use_cases/port/iPort';

export interface IPresenter {
    view: {}

    render(outPutPort: IOutputPort<IPortFormat>): void;
}