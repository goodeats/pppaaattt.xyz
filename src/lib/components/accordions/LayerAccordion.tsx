import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import DesignAttributesAccordion from './DesignAttributesAccordion';
import {
  AccordionPanelText,
  SharedAccordionItemProps,
  SharedAccordionButton,
} from './_shared';
import { LayerChildStack } from '../stacks/LayerChildStack';

const LayerAccordion = () => {
  const LayerAccordionItem = ({
    buttonText,
    panelText,
    children,
  }: SharedAccordionItemProps) => {
    const panelColor = useColorModeValue('gray.200', 'gray.200');

    return (
      <AccordionItem>
        <SharedAccordionButton buttonText={buttonText} />
        <AccordionPanel pb={4} bg={panelColor}>
          <AccordionPanelText>{panelText}</AccordionPanelText>
          {children}
        </AccordionPanel>
      </AccordionItem>
    );
  };
  return (
    <Accordion allowToggle>
      <LayerAccordionItem
        buttonText="Design Attributes"
        panelText="Set design attributes for this layer"
        children={<DesignAttributesAccordion />}
      />
      <LayerAccordionItem
        buttonText="Child Layers"
        panelText="Layers that inherit from this layer"
        children={<LayerChildStack />}
      />
      {/* TODO: move this to footer with buttons */}
      <LayerAccordionItem
        buttonText="Actions"
        panelText="Delete, duplicate, or rename this layer"
      />
    </Accordion>
  );
};

export default LayerAccordion;
