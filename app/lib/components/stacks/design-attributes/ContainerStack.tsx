import { Box, Stack, StackDivider, useColorModeValue } from '@chakra-ui/react';
import { AccordionPanelText } from '../../accordions/_shared';
import { ContainerModal } from '../../modals/ContainerModal';

type ContainerStackProps = {
  currentDepth: number;
};

// toolTip="Set container options for this layer: width, height, padding, margin, etc."

export const ContainerStack = ({ currentDepth }: ContainerStackProps) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const StackBody = () => {
    return (
      <Box>
        <AccordionPanelText color={textColor}>
          Container settings for{' '}
          {currentDepth > 0 ? 'this layer' : 'root layer'}
        </AccordionPanelText>
      </Box>
    );
  };

  return (
    <Stack
      spacing={2}
      divider={<StackDivider borderColor="gray.300" />}
      textAlign="left"
    >
      <StackBody />
      <ContainerModal />
    </Stack>
  );
};
