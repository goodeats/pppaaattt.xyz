import { Flex } from '~/components';

type LayoutProps = {
  children?: React.ReactNode;
};

export const ColumnContainer = ({ children }: LayoutProps) => {
  return (
    <Flex width="full" flexDirection="row" gap={4}>
      {children}
    </Flex>
  );
};

export const Column = ({ children }: LayoutProps) => {
  return (
    <Flex flex="1" flexDirection="column">
      {children}
    </Flex>
  );
};
