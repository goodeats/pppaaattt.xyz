import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  useColorModeValue,
} from '~/components';
import { SharedAccordionButton, SharedAccordionItemProps } from './_shared';
import { ContainerStack } from '../stacks/design-attributes/ContainerStack';

type DesignAttributesAccordionProps = {
  currentDepth: number;
};

const DesignAttributesAccordion = ({
  currentDepth,
}: DesignAttributesAccordionProps) => {
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
          {children}
          {/* <Stack divider={<StackDivider borderColor="gray.300" />}>
            <Box>
              <AccordionPanelText color={textColor}>Not set</AccordionPanelText>
            </Box>
            <Box textAlign="left">{children}</Box>
          </Stack> */}
        </AccordionPanel>
      </AccordionItem>
    );
  };

  return (
    <Accordion bg="gray.300" allowToggle>
      <DesignAttributeAccordionItem
        buttonText="Container"
        // toolTip="Set container options for this layer: width, height, padding, margin, etc."
        children={<ContainerStack currentDepth={currentDepth} />}
      />
      {/* <DesignAttributeAccordionItem
        buttonText="Container"
        toolTip="Set container options for this layer: width, height, padding, margin, etc."
        children={<ContainerModal />}
      /> */}
      {/* <DesignAttributeAccordionItem
        buttonText="Background"
        toolTip="Set background for this layer"
        children={<BackgroundModal />}
      />
      <DesignAttributeAccordionItem
        buttonText="Palette"
        toolTip="Set palette for this layer"
        children={<PaletteModal />}
      /> */}
    </Accordion>
  );
};

export default DesignAttributesAccordion;
