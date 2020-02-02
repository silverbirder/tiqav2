import {container} from '@src/inversify.config';

import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

describe('constructor', () => {
    beforeEach(() => {
        container.snapshot();
        const FIX_DATE = new Date('1994-02-14');
        jest.spyOn(global, 'Date').mockImplementation((): any => {
            return FIX_DATE;
        });
    });
    afterEach(() => {
        container.restore();
    });
    describe('Args: EmptyObject', () => {
        // Arrange
        const args: {} = {};
        const defaultValueInt: number = 0;
        const defaultValueStr: string = '';
        const defaultValueDate: Date = new Date('1994-02-14');

        it('Return the Default Value', () => {
            // Act
            const entity: ImageEntityImpl = new ImageEntityImpl(args);
            // Assert
            expect(entity.id).toBe(defaultValueInt);
            expect(entity.quote).toBe(defaultValueStr);
            expect(entity.url).toBe(defaultValueStr);
            expect(entity.extension).toHaveLength(0);
            expect(entity.tags).toHaveLength(0);
            expect(entity.updateDate.toString()).toBe(defaultValueDate.toString());
        });
    });
    describe('Args: All Properties', () => {
        it('Return the Args Values', () => {
            // Arrange
            const allProperties: any = {
                objectID: 1,
                quote: 'LGTM',
                url: 'https://pbs.twimg.com/profile_images/751281815571140608/g4Yx5IDW.jpg',
                extension: ['jpg'],
                tags: ['cute'],
                updateDate: '2020-01-04',
            };

           // Act
           const entity: ImageEntityImpl = new ImageEntityImpl(allProperties);

           // Assert
           expect(entity.id).toBe(allProperties.objectID);
           expect(entity.quote).toBe(allProperties.quote);
           expect(entity.url).toBe(allProperties.url);
           expect(entity.extension).toHaveLength(1);
           expect(entity.tags).toHaveLength(1);
           expect(entity.updateDate.toString()).toBe(new Date(allProperties.updateDate).toString());
       });
    });
});