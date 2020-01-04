import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export interface ImageOutputPortFormat extends IOutputPortFormat {
    binary: ArrayBuffer;
}

export interface ImageSettableOutputPortFormat extends IOutputPortFormat {
    binary: ArrayBuffer;
}

export class ImageOutputPortImpl implements IOutputPort<ImageOutputPortFormat> {
    private _data: ImageOutputPortFormat = {binary: Buffer.alloc(0)};

    set(params: ImageSettableOutputPortFormat) {
        this._data.binary = params.binary;
    }

    get(): ImageOutputPortFormat {
        return this._data;
    }
}