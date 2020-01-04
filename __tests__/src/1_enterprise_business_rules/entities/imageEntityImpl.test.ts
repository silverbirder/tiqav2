import {TYPES} from '@src/types';
import {container} from '@src/inversify.config';
import {IDate} from '@src/utils/date';

import {ImageEntityImpl} from '@src/1_enterprise_business_rules/entities/imageEntityImpl';

describe('Constructor', () => {
    describe('Args: EmptyObject', () => {
        // Arrange
        const args: {} = {};
        const defaultValueInt: number = 0;
        const defaultValueStr: string = '';
        const defaultValueDate: Date = new Date('1994-02-14');

        it('Return the Default Value', () => {
            // Act
            const entity: ImageEntityImpl = new ImageEntityImpl(args, container.get<IDate>(TYPES.DATE));
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
        // Arrange
        const allProperties: any = {
            objectID: 1,
            quote: 'LGTM',
            url: 'https://pbs.twimg.com/profile_images/751281815571140608/g4Yx5IDW.jpg',
            extension: ['jpg'],
            tags: ['cute'],
            updateDate: '2020-01-04',
        };
       it('Return the Args Values', () => {
           // Act
           const entity: ImageEntityImpl = new ImageEntityImpl(allProperties, container.get<IDate>(TYPES.DATE));

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