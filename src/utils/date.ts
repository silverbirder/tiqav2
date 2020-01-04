import {injectable} from 'inversify';

export interface IDate {
    create(value?: any): Date;
}

@injectable()
export class DateImpl implements IDate {
    create(value?: any): Date {
        if(typeof value === 'string') {
            return new Date(value);
        } else {
            return new Date();
        }
    };
}

@injectable()
export class DateMock implements IDate {
    create(value?: any): Date {
        if (typeof value === 'string') {
            return new Date(value);
        } else {
            return new Date('1994-02-14');
        }
    }
}