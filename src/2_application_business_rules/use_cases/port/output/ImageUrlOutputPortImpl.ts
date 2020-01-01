import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export interface ImageUrlOutputPortFormat extends IOutputPortFormat {
    binary: ArrayBuffer;
}

export interface ImageUrlSettableOutputPortFormat extends IOutputPortFormat {
    binary: ArrayBuffer;
}

export default class ImageUrlOutputPort implements IOutputPort<ImageUrlOutputPortFormat> {
    private _data: ImageUrlOutputPortFormat = {binary: Buffer.alloc(0)};

    set(params: ImageUrlSettableOutputPortFormat) {
        this._data.binary = params.binary;
    }

    get(): ImageUrlOutputPortFormat {
        return this._data;
    }
}