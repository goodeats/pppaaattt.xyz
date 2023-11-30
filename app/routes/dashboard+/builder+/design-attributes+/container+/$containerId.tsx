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
import { DeleteContainer, action } from './__delete-container';

export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { containerId } = params;
  if (!containerId) {
    return redirect('/dashboard/builder/design-attributes/container');
  }

  const container = await prisma.designAttribute.findUnique({
    where: {
      id: containerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!container) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(
      '/dashboard/builder/design-attributes/container?notFound=true'
    );
  }

  return json({ container });
}

export default function ContainerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { container } = data;
  const { title, description } = container;

  const ContainerContent = () => {
    return (
      <Stack>
        <List>
          <ListItem>Container Title: {title}</ListItem>
          <ListItem>Container Description: {description}</ListItem>
        </List>
      </Stack>
    );
  };

  const ContainerActions = () => {
    return (
      <Stack>
        <ButtonGroup>
          <NavLink to="edit">
            <Button variant="outline">Edit</Button>
          </NavLink>
          <DeleteContainer id={container.id} />
        </ButtonGroup>
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
      <ContainerContent />
      <ContainerActions />
    </Stack>
  );
}
