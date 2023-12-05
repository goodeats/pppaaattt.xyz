import { Flex } from '~/components';

type PageContentContainerProps = {
  children?: React.ReactNode;
};

export const PageContentContainer = ({
  children,
}: PageContentContainerProps) => {
  return (
    <Flex flex={1} border="1px" borderColor="gray.300">
      <Flex flex={1}>{children}</Flex>
    </Flex>
  );
};
