import {IOutputPort, IOutputPortFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';

export class ImageUrlOutputPortFormat implements IOutputPortFormat {
    binary!: ArrayBuffer;
}

export class ImageUrlSettableOutputPortFormat implements IOutputPortFormat {
    binary!: ArrayBuffer;
}

export default class ImageUrlOutputPort implements IOutputPort<ImageUrlOutputPortFormat> {
    private _data: ImageUrlOutputPortFormat = {binary: Buffer.alloc(0)};

    set(params: { binary: ArrayBuffer }) {
        this._data.binary = params.binary;
    }

    get(): ImageUrlOutputPortFormat {
        return this._data;
    }
}