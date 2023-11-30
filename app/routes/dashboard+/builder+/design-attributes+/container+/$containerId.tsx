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
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          explicitValue: true,
          randomValues: true,
          minValue: true,
          maxValue: true,
          createdAt: true,
          updatedAt: true,
        },
      },
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
  const { title, description, createdAt, updatedAt, inputParameters } =
    container;

  const ContainerContent = () => {
    return (
      <Stack>
        <List>
          <ListItem>Container Title: {title}</ListItem>
          <ListItem>Container Description: {description}</ListItem>
          <ListItem>Created: {createdAt}</ListItem>
          <ListItem>Updated: {updatedAt}</ListItem>
        </List>
      </Stack>
    );
  };

  const ContainerParameters = () => {
    if (!inputParameters || inputParameters.length === 0)
      return (
        <Stack>
          <List>
            <ListItem>No Container Parameters</ListItem>
          </List>
        </Stack>
      );

    // only one input parameter for design attributes right now
    // later we will add heirarchy of input parameters
    const inputParameter = inputParameters[0];
    const { inputType } = inputParameter;
    return (
      <Stack>
        <List>
          <ListItem>Container Parameters:</ListItem>
          <ListItem>Input Type: {inputType}</ListItem>
        </List>
        <Stack>
          <ButtonGroup>
            <NavLink to={'input-parameters'}>
              <Button variant="outline">Edit</Button>
            </NavLink>
          </ButtonGroup>
        </Stack>
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
      <ContainerParameters />
      <ContainerActions />
    </Stack>
  );
}
