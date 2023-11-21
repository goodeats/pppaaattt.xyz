import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import LayerAccordion from '../accordions/LayerAccordion';
import { AccordionPanelText } from '../accordions/_shared';

const LayerCard = () => {
  const bg = useColorModeValue('white', 'gray.300');
  const textColor = useColorModeValue('black.900', 'gray.800');

  return (
    <Card bg={bg} textColor={textColor}>
      <CardHeader>
        <Heading size="md">Layer</Heading>
      </CardHeader>
      <CardBody>
        <AccordionPanelText>
          Main layer settings will cascade to all child layers unless
          overridden. All design attributes must be initially set here.
        </AccordionPanelText>
        <LayerAccordion />
      </CardBody>
    </Card>
  );
};

export default LayerCard;
