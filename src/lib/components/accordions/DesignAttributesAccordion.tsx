import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AccordionPanelText,
  SharedAccordionButton,
  SharedAccordionItemProps,
} from './_shared';
import { PaletteModal } from '../modals/PaletteModal';
import { ContainerModal } from '../modals/ContainerModal';
import { BackgroundModal } from '../modals/BackgroundModal';

const DesignAttributesAccordion = () => {
  const DesignAttributeAccordionItem = ({
    buttonText,
    children,
  }: SharedAccordionItemProps) => {
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const panelColor = useColorModeValue('gray.100', 'gray.600');

    return (
      <AccordionItem>
        <SharedAccordionButton buttonText={buttonText} />
        <AccordionPanel pb={4} bg={panelColor}>
          <Stack divider={<StackDivider borderColor="gray.200" />}>
            <Box>
              <AccordionPanelText color={textColor}>Not set</AccordionPanelText>
            </Box>
            <Box textAlign="left">{children}</Box>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    );
  };

  return (
    <Accordion bg="gray.300" allowToggle>
      <DesignAttributeAccordionItem
        buttonText="Container"
        toolTip="Set container options for this layer: width, height, padding, margin, etc."
        children={<ContainerModal />}
      />
      <DesignAttributeAccordionItem
        buttonText="Background"
        toolTip="Set background for this layer"
        children={<BackgroundModal />}
      />
      <DesignAttributeAccordionItem
        buttonText="Palette"
        toolTip="Set palette for this layer"
        children={<PaletteModal />}
      />
    </Accordion>
  );
};

export default DesignAttributesAccordion;
