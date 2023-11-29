import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
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

  const LayerContent = () => {
    return (
      <Stack>
        <List>
          <ListItem>Layer ID: {id}</ListItem>
          <ListItem>Layer Title: {title}</ListItem>
          <ListItem>Layer Description: {description}</ListItem>
        </List>
      </Stack>
    );
  };

  const LayerActions = () => {
    return (
      <Stack>
        <NavLink to="edit">
          <ButtonGroup>
            <Button variant="outline">Edit</Button>
          </ButtonGroup>
        </NavLink>
      </Stack>
    );
  };

  return (
    <Stack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={8}
      width="full"
      paddingX={8}
      paddingY={5}
      textAlign="left"
    >
      <LayerContent />
      <LayerActions />
    </Stack>
  );
}
