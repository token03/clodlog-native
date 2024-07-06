import React from 'react';
import {XStack, YStack, Label, Slider, Paragraph, LabelProps} from "tamagui";
import {Settings} from "../../../classes/settings";

interface GridColumnSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  labelProps: LabelProps;
}

export const GridColumnSlider: React.FC<GridColumnSliderProps> = ({ value, onValueChange, labelProps }) => (
  <XStack gap="$5" paddingBottom={"$3"}>
    <Label {...labelProps}># of Columns:</Label>
    <YStack
      width={`${90 - parseInt(labelProps.width as string)}%`}
      alignSelf="center" 
      position="relative"
    >
      <Slider
        defaultValue={[value]}
        min={Settings.MIN_GRID_COLUMNS}
        max={Settings.MAX_GRID_COLUMNS}
        step={1}
        width="100%"
        onValueChange={(value) => onValueChange(value[0])}
        alignSelf="center"
      >
        <XStack>
          <Slider.Track size="$1">
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb size="$1" index={0} circular />
        </XStack>
      </Slider>
      <XStack position="absolute" bottom="-25px" left={0} right={0} justifyContent="space-between">
        {[...Array(Settings.MAX_GRID_COLUMNS - Settings.MIN_GRID_COLUMNS + 1)].map((_, index) => (
          <Paragraph key={index} size="$1">
            {Settings.MIN_GRID_COLUMNS + index}
          </Paragraph>
        ))}
      </XStack>
    </YStack>
  </XStack>
);