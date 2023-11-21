import { Box, Stack } from '@chakra-ui/react';
import Column from '../Column';
import LayerCard from '../../components/cards/LayerCard';
import { ColumnHeading } from './_shared';

const FormColumn = () => {
  return (
    <Column>
      <Box width="full" textAlign="center">
        <ColumnHeading>Input</ColumnHeading>
        <Stack marginY={10} borderRadius={0} padding={1}>
          <LayerCard depth={0} />
        </Stack>
      </Box>
    </Column>
  );
};

export default FormColumn;
