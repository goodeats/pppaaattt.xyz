import {
  Button,
  ButtonGroup,
  ContentActions,
  ContentContainer,
  ContentOverview,
  List,
  ListItem,
  Stack,
  StackDivider,
} from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { DeleteContainer, action } from './__delete-container';
import { ContainerInputParameters } from './__input-parameters';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const containerId = params.containerId;
    const title = data.container?.title ?? 'Container';
    return (
      <NavLink
        to={`/dashboard/builder/design-attributes/container/${containerId}`}
      >
        {title}
      </NavLink>
    );
  },
};

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
          unitType: true,
          explicitValues: true,
          randomValues: true,
          rangeValues: true,
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
  const { inputParameters } = container;

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

    return <ContainerInputParameters inputParameter={inputParameter} />;
  };

  const ContainerActions = () => {
    return (
      <ContentActions>
        <DeleteContainer id={container.id} />
      </ContentActions>
    );
  };

  return (
    <ContentContainer>
      <ContentOverview item={container} />
      <ContainerParameters />
      <ContainerActions />
    </ContentContainer>
  );
}
