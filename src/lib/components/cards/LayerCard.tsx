import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import LayerAccordion from '../accordions/LayerAccordion';
import { AccordionPanelText } from '../accordions/_shared';

type LayerCardProps = {
  depth: number;
};

const LayerCard = ({ depth }: LayerCardProps) => {
  const bg = useColorModeValue('white', 'gray.300');
  const textColor = useColorModeValue('black.900', 'gray.800');

  const LayerCardHeading = () => {
    const layerName = Array.from({ length: depth + 1 }, (_, i) => i).join('.');
    return (
      <Heading size="md" textAlign="left">
        Layer {layerName}
      </Heading>
    );
  };

  const LayerCardText = () => {
    if (depth > 0)
      return (
        <AccordionPanelText>
          Child layers can override parent layer settings. All design attributes
          must be initially set here.
        </AccordionPanelText>
      );

    return (
      <AccordionPanelText>
        Main layer settings will cascade to all child layers unless overridden.
        All design attributes must be initially set here.
      </AccordionPanelText>
    );
  };

  return (
    <Card bg={bg} textColor={textColor}>
      <CardHeader>
        <LayerCardHeading />
      </CardHeader>
      <CardBody>
        <LayerCardText />
        <LayerAccordion currentDepth={depth} />
      </CardBody>
    </Card>
  );
};

export default LayerCard;
