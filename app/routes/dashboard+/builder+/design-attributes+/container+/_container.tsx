import {
  Text,
  Flex,
  CustomSidebar,
  PageOverview,
  PageActions,
  PageContent,
  PageContentContainer,
} from '~/components';
import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => {
    return (
      <NavLink to={`/dashboard/builder/design-attributes/container`}>
        Container
      </NavLink>
    );
  },
};

export async function loader({ request }: DataFunctionArgs) {
  const containers = await prisma.designAttribute.findMany({
    where: {
      attributeType: {
        equals: 'container',
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return json({ containers });
}

export default function ContainerPage() {
  const data = useLoaderData<typeof loader>();
  const { containers } = data;

  const ContainerOverview = () => {
    return (
      <PageOverview title="Container">
        <Text fontSize="sm">Container count: {containers.length}</Text>
        <Text fontSize="sm">Container sets the dimensions of the canvas</Text>
      </PageOverview>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <ContainerOverview />
      <PageContentContainer>
        <CustomSidebar items={containers} itemType="containers" />
        <PageContent />
      </PageContentContainer>
      <PageActions itemName="Container" />
    </Flex>
  );
}
