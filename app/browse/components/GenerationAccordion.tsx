import {ChevronDown} from "@tamagui/lucide-icons";
import {Accordion, Paragraph, ScrollView, Square} from "tamagui";
import {BrowseSetButton} from "./BrowseSetButton";
import {useEffect, useMemo, useState} from "react";
import {getAllSeriesDetailed} from "../../../services/browseService";
import {Serie} from "@tcgdex/sdk";

export function GenerationAccordion() {
  const [seriesList, setSeriesList] = useState<Array<Serie>>();
  useEffect(() => {
    const fetchAllSeries = async () => {
      const seriesList = await getAllSeriesDetailed();
      setSeriesList(seriesList);
    };

    fetchAllSeries();
  }, []);  
  
  const accordionItems = useMemo(() => {
    return seriesList?.reverse().map((series) => (
      <Accordion.Item 
        value={series.id} 
        key={series.id}
      >
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({
              open,
            }: {
            open: boolean
          }) => (
            <>
              <Paragraph>{series.name}</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }} padding={0}>
            {series.sets.reverse().map((set) => (
              <BrowseSetButton key={set.id} set={set}/>
            ))}
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    ));
  }, [seriesList]);

  return (
    <Accordion type="multiple" defaultValue={["sv"]}>
      {accordionItems}
    </Accordion>
  )
}