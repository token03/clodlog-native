import { Check, ChevronDown } from '@tamagui/lucide-icons';
import { Accordion, Checkbox, Label, Paragraph, Square, XStack, YStack } from 'tamagui';
import React from 'react';

const Option = React.memo(
    ({
        option,
        isChecked,
        onCheckedChange,
    }: {
        option: string;
        isChecked: boolean;
        onCheckedChange: (checked: boolean | 'indeterminate') => void;
    }) => {
        return (
            <XStack paddingLeft={'$3'} gap={'$2'} alignItems={'center'}>
                <Checkbox
                    id={option}
                    size={'$4'}
                    checked={isChecked}
                    onCheckedChange={onCheckedChange}
                >
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label size={'$4'} htmlFor={option}>
                    {option}
                </Label>
            </XStack>
        );
    }
);

export const FilterAccordion = ({
    name,
    options,
    selectedFilters,
    setSelectedFilter,
}: {
    name: string;
    options: string[];
    selectedFilters: string[];
    setSelectedFilter: (filter: string[]) => void;
}) => {
    const handleCheckedChange = (option: string) => (checked: boolean | 'indeterminate') => {
        if (checked) {
            setSelectedFilter([...selectedFilters, option]);
        } else {
            setSelectedFilter(selectedFilters.filter(filter => filter !== option));
        }
    };

    return (
        <Accordion overflow='hidden' type='multiple'>
            <Accordion.Item value='a1' backgroundColor={'$black2'}>
                <Accordion.Trigger
                    flexDirection='row'
                    justifyContent='space-between'
                    backgroundColor={'$black2'}
                    borderWidth={0}
                >
                    {({ open }: { open: boolean }) => (
                        <>
                            <Paragraph>{name}</Paragraph>
                            <Square animation='quick' rotate={open ? '180deg' : '0deg'}>
                                <ChevronDown size='$1' />
                            </Square>
                        </>
                    )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation={'quick'}>
                    <Accordion.Content
                        animation={'quick'}
                        exitStyle={{ opacity: 0 }}
                        padding={0}
                        flex={1}
                        backgroundColor={'$black2'}
                    >
                        {options.map((option, index) => (
                            <Option
                                key={index}
                                option={option}
                                isChecked={selectedFilters.includes(option)}
                                onCheckedChange={handleCheckedChange(option)}
                            />
                        ))}
                    </Accordion.Content>
                </Accordion.HeightAnimator>
            </Accordion.Item>
        </Accordion>
    );
};
