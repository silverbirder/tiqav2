import {IOutputPort} from '../../../../1_enterprise_business_rules/use_cases/port/iOutputPort';
import {IPortDataFormat} from '../../../../1_enterprise_business_rules/use_cases/port/iPort';

export class ImageUrlOutputPortDataFormat implements IPortDataFormat {
    binary!: ArrayBuffer;
}

export class ImageUrlSettableOutputPortDataFormat implements IPortDataFormat {
    binary!: ArrayBuffer;
}

export default class ImageUrlOutputPort implements IOutputPort<ImageUrlOutputPortDataFormat> {
    private _data: ImageUrlOutputPortDataFormat = {binary: Buffer.alloc(0)};

    set(params: { binary: ArrayBuffer }) {
        this._data.binary = params.binary;
    }

    get(): ImageUrlOutputPortDataFormat {
        return this._data;
    }
}