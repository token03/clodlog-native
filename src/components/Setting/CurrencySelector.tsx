import React from "react";
import { XStack, Label, LabelProps } from "tamagui";
import { Currency } from "@/constants/Currency";
import { SelectItem } from "@/components/Select";

interface CurrencySelectorProps {
  currentCurrency: string;
  onValueChange: (currency: string) => void;
  labelProps: LabelProps;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onValueChange,
  labelProps,
}) => (
  <XStack gap="$5">
    <Label {...labelProps}>Currency:</Label>
    <SelectItem
      id="currency"
      items={Object.keys(Currency).map((currency) => ({
        value: currency,
        label: Currency[currency].name,
        emoji: Currency[currency].symbol,
      }))}
      width={`${95 - parseInt(labelProps.width as string)}%`}
      size="$3"
      defaultValue={currentCurrency}
      onValueChange={onValueChange}
    />
  </XStack>
);
