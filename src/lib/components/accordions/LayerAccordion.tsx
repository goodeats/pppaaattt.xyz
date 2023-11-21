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

type LayerAccordionProps = {
  currentDepth: number;
  childCount: number;
  addChild: () => void;
  removeChild: () => void;
};

const LayerAccordion = ({
  currentDepth,
  childCount,
  addChild,
  removeChild,
}: LayerAccordionProps) => {
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
        children={
          <LayerChildStack
            currentDepth={currentDepth}
            childCount={childCount}
            addChild={addChild}
            removeChild={removeChild}
          />
        }
      />
    </Accordion>
  );
};

export default LayerAccordion;
