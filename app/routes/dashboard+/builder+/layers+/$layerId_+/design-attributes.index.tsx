import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { Box, Button, DesignAttributesTable, Stack } from '~/components';
import { prisma } from '~/utils/db.server';

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;

  const query = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
    include: {
      designAttributes: {
        include: {
          designAttribute: true,
        },
      },
    },
  });

  if (!query) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/builder/layers?notFound=true');
  }

  const layer = {
    ...query,
    // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/working-with-many-to-many-relations#explicit-relations
    designAttributes: query.designAttributes.map(
      (attr) => attr.designAttribute
    ),
  };

  return json({ layer });
}

export default function DesignAttributesIndexPage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  const { designAttributes } = layer;

  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <Box pt={4} textAlign="right">
        <NavLink to="new">
          <Button variant="outline">Add Design Attribute</Button>
        </NavLink>
      </Box>
      <DesignAttributesTable
        caption={`${designAttributes.length} Design Attributes for ${layer.title}`}
        designAttributes={designAttributes.map((designAttribute) => ({
          ...designAttribute,
          createdAt: new Date(designAttribute.createdAt),
        }))}
      />
    </Stack>
  );
}
