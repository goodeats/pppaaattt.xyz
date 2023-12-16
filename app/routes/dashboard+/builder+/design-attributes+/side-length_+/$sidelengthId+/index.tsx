import {
  ContentActions,
  ContentOverview,
  List,
  ListItem,
  Stack,
  ContentContainer,
} from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { DeleteSideLength, action } from './__delete-side-length';
import { SideLengthInputParameters } from './__input-parameters';

const urlResourcePath = '/dashboard/builder/design-attributes/side-length';

export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sidelengthId } = params;
  if (!sidelengthId) {
    return redirect(urlResourcePath);
  }

  const sideLength = await prisma.designAttribute.findUnique({
    where: {
      id: sidelengthId,
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

  if (!sideLength) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(`${urlResourcePath}?notFound=true`);
  }

  return json({ sideLength });
}

export default function SidelengthDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { sideLength } = data;
  const { inputParameters } = sideLength;

  const InputParameters = () => {
    if (!inputParameters || inputParameters.length === 0)
      return (
        <Stack>
          <List>
            <ListItem>No SideLength Parameters</ListItem>
          </List>
        </Stack>
      );

    // only one input parameter for design attributes right now
    // later we will add heirarchy of input parameters
    const inputParameter = inputParameters[0];

    return <SideLengthInputParameters inputParameter={inputParameter} />;
  };

  const PaletteActions = () => {
    return (
      <ContentActions>
        <DeleteSideLength id={sideLength.id} />
      </ContentActions>
    );
  };

  return (
    <ContentContainer>
      <ContentOverview item={sideLength} />
      <InputParameters />
      <PaletteActions />
    </ContentContainer>
  );
}
