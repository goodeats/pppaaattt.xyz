import {
  Button,
  ButtonGroup,
  ContentActions,
  ContentPalette,
  ContentOverview,
  List,
  ListItem,
  Stack,
  StackDivider,
} from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
// import { DeletePalette, action } from './__delete-palette';
// import { PaletteInputParameters } from './__input-parameters';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const paletteId = params.paletteId;
    const title = data.palette?.title ?? 'Palette';
    return (
      <NavLink to={`/dashboard/builder/design-attributes/palette/${paletteId}`}>
        {title}
      </NavLink>
    );
  },
};

// export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { paletteId } = params;
  if (!paletteId) {
    return redirect('/dashboard/builder/design-attributes/palette');
  }

  const palette = await prisma.designAttribute.findUnique({
    where: {
      id: paletteId,
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

  if (!palette) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(
      '/dashboard/builder/design-attributes/palette?notFound=true'
    );
  }

  return json({ palette });
}

export default function PaletteDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { palette } = data;
  const { inputParameters } = palette;

  const PaletteParameters = () => {
    if (!inputParameters || inputParameters.length === 0)
      return (
        <Stack>
          <List>
            <ListItem>No Palette Parameters</ListItem>
          </List>
        </Stack>
      );

    // only one input parameter for design attributes right now
    // later we will add heirarchy of input parameters
    const inputParameter = inputParameters[0];

    return <PaletteInputParameters inputParameter={inputParameter} />;
  };

  const PaletteActions = () => {
    return (
      <ContentActions>{/* <DeletePalette id={palette.id} /> */}</ContentActions>
    );
  };

  return (
    <div>
      <ContentOverview item={palette} />
      {/* <PaletteParameters /> */}
      <PaletteActions />
    </div>
  );
}
