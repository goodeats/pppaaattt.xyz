import React from 'react';
import { Box, Stack, Text } from '~/components';

type PageOverviewProps = {
  title: string;
  children?: React.ReactNode;
};

export const PageOverview = ({ title, children }: PageOverviewProps) => {
  return (
    <Box as="section" width="full" paddingX={8} paddingY={5}>
      <Stack textAlign="left">
        <Text fontSize="lg">{title}</Text>
        {children}
      </Stack>
    </Box>
  );
};
