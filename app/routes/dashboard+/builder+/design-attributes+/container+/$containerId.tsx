import {
  ContentActions,
  ContentContainer,
  ContentOverview,
  LayersTable,
  List,
  ListItem,
  Stack,
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

  const query = await prisma.designAttribute.findUnique({
    where: {
      id: containerId,
    },
    include: {
      inputParameters: true,
      layers: {
        include: {
          layer: true,
        },
      },
    },
  });

  if (!query) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(
      '/dashboard/builder/design-attributes/container?notFound=true'
    );
  }

  const container = {
    ...query,
    // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/working-with-many-to-many-relations#explicit-relations
    layers: query.layers.map((attr) => attr.layer),
  };

  return json({ container });
}

export default function ContainerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { container } = data;
  const { inputParameters, layers } = container;

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

  const ContainerLayers = () => {
    return (
      <LayersTable
        layers={layers.map((layer) => ({
          ...layer,
          createdAt: new Date(layer.createdAt),
        }))}
      />
    );
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
      <ContainerLayers />
      <ContainerActions />
    </ContentContainer>
  );
}
