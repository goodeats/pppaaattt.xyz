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
      <NavLink to={`/dashboard/builder/design-attributes/side-length`}>
        Side Length
      </NavLink>
    );
  },
};

export async function loader({ request }: DataFunctionArgs) {
  const sideLengths = await prisma.designAttribute.findMany({
    where: {
      layerId: null,
      attributeType: {
        equals: 'sideLength',
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
  return json({ sideLengths });
}

export default function SideLengthPage() {
  const data = useLoaderData<typeof loader>();
  const { sideLengths } = data;

  const Overview = () => {
    return (
      <PageOverview title="Side Length">
        <Text fontSize="sm">Side Length count: {sideLengths.length}</Text>
        <Text fontSize="sm">
          Side Length sets the width of the shapes on the canvas
        </Text>
      </PageOverview>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <Overview />
      <PageContentContainer>
        <CustomSidebar items={sideLengths} itemType="sideLengths" />
        <PageContent />
      </PageContentContainer>
      <PageActions itemName="Side Length" />
    </Flex>
  );
}
