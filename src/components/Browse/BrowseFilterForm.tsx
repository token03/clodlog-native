import { Button, Form, Input, Label, Select, XStack, YStack } from 'tamagui';
import React from 'react';
import { FilterAccordion } from '@/components/Filter/FilterAccordion';
import { SelectItem } from '@/components/Select';
import { useMeta } from '@/contexts/MetaContext';
import { series } from 'expo-router/build/fork/useLinking';

export const BrowseFilterForm = ({ submitFilter }: { submitFilter: () => void }) => {
  const {
    rarities: rarityOptions,
    supertypes: supertypeOptions,
    subtypes: subtypeOptions,
    types: typeOptions,
    artists: artistOptions,
    hp: hpOptions,
    series: seriesOptions,
    sets: setOptions,
  } = useMeta();
  const [rarities, setRarities] = React.useState(['']);
  const [supertypes, setSupertypes] = React.useState(['']);
  const [subtypes, setSubtypes] = React.useState(['']);

  const resetFilter = () => {
    setRarities(['']);
    setSupertypes(['']);
    setSubtypes(['']);
  };

  return (
    <Form
      alignItems='center'
      minWidth={'100%'}
      gap='$2'
      onSubmit={() => submitFilter()}
      paddingTop={'$1'}
      paddingRight={'$3'}
    >
      <YStack width={'100%'} gap={'$4'}>
        {/*Filter Controls*/}
        <XStack justifyContent={'space-between'} width={'100%'}>
          <Button size={'$3'} onPress={resetFilter} chromeless>
            Reset
          </Button>
          <Form.Trigger asChild>
            <Button size={'$3'}>Filter</Button>
          </Form.Trigger>
        </XStack>

        {/*Filter Stack*/}
        <YStack paddingTop={'$3'} gap={'$3'}>
          {/*Card Names*/}
          <XStack
            alignItems={'center'}
            gap={'$4'}
            justifyContent={'space-between'}
            paddingLeft={'$4'}
          >
            <Label>Card Names:</Label>
            <Input placeholder='Search...' flex={1} size={'$3'} />
          </XStack>

          {/*Card Text*/}
          <XStack
            alignItems={'center'}
            gap={'$4'}
            justifyContent={'space-between'}
            paddingLeft={'$4'}
          >
            <Label>Card Text:</Label>
            <Input placeholder='Search...' flex={1} size={'$3'} />
          </XStack>

          {/*HP*/}
          <XStack
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={'$4'}
            paddingLeft={'$4'}
          >
            <Label>HP:</Label>
            <SelectItem items={hpOptions.map(hp => ({ label: hp, value: hp }))} size={'$3'} />
          </XStack>

          {/*Type*/}
          <XStack
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={'$4'}
            paddingLeft={'$4'}
          >
            <Label>Type:</Label>
            <SelectItem
              items={typeOptions.map(type => ({ label: type, value: type }))}
              size={'$3'}
            />
          </XStack>

          <XStack
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={'$4'}
            paddingLeft={'$4'}
          >
            <Label>Artist:</Label>
            <SelectItem
              items={artistOptions.map(artist => ({
                label: artist,
                value: artist,
              }))}
              size={'$3'}
            />
          </XStack>
        </YStack>

        <YStack>
          <FilterAccordion
            name={'Rarities'}
            options={rarityOptions}
            selectedFilters={rarities}
            setSelectedFilter={setRarities}
          />
          <FilterAccordion
            name={'Supertypes'}
            options={supertypeOptions}
            selectedFilters={supertypes}
            setSelectedFilter={setSupertypes}
          />
          <FilterAccordion
            name={'Subtypes'}
            options={subtypeOptions}
            selectedFilters={subtypes}
            setSelectedFilter={setSubtypes}
          />
          <FilterAccordion
            name={'Series'}
            options={seriesOptions}
            selectedFilters={subtypes}
            setSelectedFilter={setSubtypes}
          />
          <FilterAccordion
            name={'Sets'}
            options={setOptions}
            selectedFilters={subtypes}
            setSelectedFilter={setSubtypes}
          />
        </YStack>
      </YStack>
    </Form>
  );
};
