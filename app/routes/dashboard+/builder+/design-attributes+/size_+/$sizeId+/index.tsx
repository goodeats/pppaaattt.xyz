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
import { DeleteSize, action } from './__delete-size';
import { SizeInputParameters } from './__input-parameters';

const urlResourcePath = '/dashboard/builder/design-attributes/size';

export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sizeId } = params;
  if (!sizeId) {
    return redirect(urlResourcePath);
  }

  const size = await prisma.designAttribute.findUnique({
    where: {
      id: sizeId,
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

  if (!size) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(`${urlResourcePath}?notFound=true`);
  }

  return json({ size });
}

export default function SizeDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { size } = data;
  const { inputParameters } = size;

  const InputParameters = () => {
    if (!inputParameters || inputParameters.length === 0)
      return (
        <Stack>
          <List>
            <ListItem>No Size Parameters</ListItem>
          </List>
        </Stack>
      );

    // only one input parameter for design attributes right now
    // later we will add heirarchy of input parameters
    const inputParameter = inputParameters[0];

    return <SizeInputParameters inputParameter={inputParameter} />;
  };

  const PaletteActions = () => {
    return (
      <ContentActions>
        <DeleteSize id={size.id} />
      </ContentActions>
    );
  };

  return (
    <ContentContainer>
      <ContentOverview item={size} />
      <InputParameters />
      <PaletteActions />
    </ContentContainer>
  );
}
