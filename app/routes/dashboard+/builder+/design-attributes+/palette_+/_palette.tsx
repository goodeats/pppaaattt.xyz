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
      <NavLink to={`/dashboard/builder/design-attributes/palette`}>
        Palette
      </NavLink>
    );
  },
};

export async function loader({ request }: DataFunctionArgs) {
  const palettes = await prisma.designAttribute.findMany({
    where: {
      attributeType: {
        equals: 'palette',
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
  return json({ palettes });
}

export default function PalettePage() {
  const data = useLoaderData<typeof loader>();
  const { palettes } = data;

  const Overview = () => {
    return (
      <PageOverview title="Palette">
        <Text fontSize="sm">Palette count: {palettes.length}</Text>
        <Text fontSize="sm">Palette sets the color palette of the canvas</Text>
      </PageOverview>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <Overview />
      <PageContentContainer>
        <CustomSidebar items={palettes} itemType="palettes" />
        <PageContent />
      </PageContentContainer>
      <PageActions itemName="Palette" />
    </Flex>
  );
}
