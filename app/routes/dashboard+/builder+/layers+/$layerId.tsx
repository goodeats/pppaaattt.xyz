import { List, ListItem, Stack } from '@chakra-ui/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;
  if (!layerId) {
    return redirect('/layers');
  }

  const layer = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!layer) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/builder/layers?notFound=true');
  }

  return json({ layer });
}

export default function LayerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  const { id, title, description } = layer;
  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <List>
        <ListItem>Layer ID: {id}</ListItem>
        <ListItem>Layer Title: {title}</ListItem>
        <ListItem>Layer Description: {description}</ListItem>
      </List>
    </Stack>
  );
}
