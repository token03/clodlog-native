import {ChevronDown} from "@tamagui/lucide-icons";
import {Accordion, Paragraph, Square} from "tamagui";
import {BrowseSetButton} from "./BrowseSetButton";

export function GenerationAccordion() {
  return (
    <Accordion overflow="hidden" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({
              open,
            }: {
            open: boolean
          }) => (
            <>
              <Paragraph>Scarlet and Violet</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }} padding={0}>
            <BrowseSetButton setId={"sv5"}/>
            <BrowseSetButton setId={"sv3pt5"}/>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
      <Accordion.Item value="a2">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({
              open,
            }: {
            open: boolean
          }) => (
            <>
              <Paragraph>Sword and Shield</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }} padding={0}>
            <BrowseSetButton setId={"sv4"}/>
            <BrowseSetButton setId={"sv4pt5"}/>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  )
}
