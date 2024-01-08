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
      <NavLink to={`/dashboard/builder/design-attributes/size`}>Size</NavLink>
    );
  },
};

export async function loader({ request }: DataFunctionArgs) {
  const sizes = await prisma.designAttribute.findMany({
    where: {
      attributeType: {
        equals: 'size',
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
  return json({ sizes });
}

export default function SizePage() {
  const data = useLoaderData<typeof loader>();
  const { sizes } = data;

  const Overview = () => {
    return (
      <PageOverview title="Size">
        <Text fontSize="sm">Size count: {sizes.length}</Text>
        <Text fontSize="sm">
          Size sets the width of the shapes on the canvas
        </Text>
      </PageOverview>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <Overview />
      <PageContentContainer>
        <CustomSidebar items={sizes} itemType="sizes" />
        <PageContent />
      </PageContentContainer>
      <PageActions itemName="Size" />
    </Flex>
  );
}
