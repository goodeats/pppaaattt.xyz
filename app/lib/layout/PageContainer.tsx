import { Flex } from '~/components';
import { LayoutProps } from '.';

const PageContainer = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" height="full">
      {children}
    </Flex>
  );
};

export default PageContainer;
