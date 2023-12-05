import { Box, Flex, Stack } from '~/components';
import { LayoutProps } from '.';

const Column = ({ children }: LayoutProps) => {
  return (
    <Flex flex="1" flexDirection="column" paddingY={8} paddingX={5}>
      <Box width="full" textAlign="center">
        <Stack>{children}</Stack>
      </Box>
    </Flex>
  );
};

export default Column;
