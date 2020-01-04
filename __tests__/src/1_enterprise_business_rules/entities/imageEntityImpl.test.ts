import {ImageEntityImpl} from '../../../../src/1_enterprise_business_rules/entities/imageEntityImpl';
import {TYPES} from '../../../../src/types';
import {IDate} from '../../../../src/utils/date';
import {container} from '../../../../src/inversify.config';

it('UnitTest/ImageEntityImpl.constructor:EmptyObject/DefaultValue', () => {
    // Arrange
    const args: {} = {};
    const defaultValueInt: number = 0;
    const defaultValueStr: string = '';
    const defaultValueDate: Date = new Date('1994-02-14');

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