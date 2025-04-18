import { ChevronDown } from '@tamagui/lucide-icons';
import { Accordion, Paragraph, Square } from 'tamagui';
import { BrowseSetButton } from './BrowseSetButton';
import { useEffect, useMemo, useState } from 'react';
import { Set } from '@/types/classes/set';
import { ViewGenerationButton } from './ViewGenerationButton';

interface GenerationAccordionProps {
  handleViewSeries: (seriesName: string) => void;
}

export function GenerationAccordion({ handleViewSeries }: GenerationAccordionProps) {
  const [seriesRecord, setSeriesRecord] = useState<Record<string, Set[]>>({});
  useEffect(() => {
    const fetchAllSeries = async () => {
      const record = await Set.groupBySeries();
      setSeriesRecord(record);
    };

    fetchAllSeries();
  }, []);

  const convertSeriesNameToId = (seriesName: string) => {
    // lowercase, spaces to dashes
    return seriesName.toLowerCase().replace(/ /g, '-');
  };

  const accordionItems = useMemo(() => {
    return Object.keys(seriesRecord)
      .reverse()
      .map(seriesName => (
        <Accordion.Item value={seriesName} key={convertSeriesNameToId(seriesName)}>
          <Accordion.Trigger flexDirection='row' justifyContent='space-between'>
            {({ open }: { open: boolean }) => (
              <>
                <Paragraph>{seriesName}</Paragraph>
                <Square animation='quick' rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size='$1' />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation='medium'>
            <Accordion.Content animation='medium' exitStyle={{ opacity: 0 }} padding={0}>
              <>
                <ViewGenerationButton seriesName={seriesName} handleViewSeries={handleViewSeries} />
                {seriesRecord[seriesName].reverse().map(set => (
                  <BrowseSetButton key={set.id} set={set} />
                ))}
              </>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      ));
  }, [seriesRecord]);

  return (
    <Accordion type='multiple' defaultValue={['sv']}>
      {accordionItems}
    </Accordion>
  );
}
