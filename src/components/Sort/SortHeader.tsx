import React from 'react';
import { Label, XStack } from 'tamagui';
import { SelectItem } from '@/components/Select';
import { Sort, SortDirection, SortDirectionOptions, SortOptions } from '@/types/sort';

interface SortHeaderProps {
  sort: string;
  sortDirection: string;
  onSortChange: (value: Sort) => void;
  onSortDirectionChange: (value: SortDirection) => void;
}

export const SortHeader: React.FC<SortHeaderProps> = ({
  sort,
  sortDirection,
  onSortChange,
  onSortDirectionChange,
}) => {
  return (
    <XStack backgroundColor={'$background'} paddingVertical={'$2'}>
      <XStack
        width={'100%'}
        height={'$2'}
        backgroundColor={'$background'}
        gap={'$2'}
        justifyContent={'center'}
      >
        <Label size={'$2'} width={'15%'}>
          Sort By:
        </Label>
        <SelectItem
          width={'40%'}
          size={'$2'}
          value={sort}
          onValueChange={onSortChange}
          items={SortOptions}
          label={'Sort By:'}
        />
        <SelectItem
          width={'25%'}
          size={'$2'}
          value={sortDirection}
          onValueChange={onSortDirectionChange}
          items={SortDirectionOptions}
          label={'Direction:'}
        />
      </XStack>
    </XStack>
  );
};
