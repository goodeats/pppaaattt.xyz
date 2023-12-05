import { Stack, StackDivider } from '~/components';

type ContentContainerProps = {
  children?: React.ReactNode;
};

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return (
    <Stack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={8}
      width="full"
      paddingX={8}
      paddingY={5}
      textAlign="left"
    >
      {children}
    </Stack>
  );
};
