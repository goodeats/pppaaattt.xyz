import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';
import { DesignAttributesPicker, action } from './__design-attributes-picker';
import { useLoaderData } from '@remix-run/react';

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

  const designAttributes = await prisma.designAttribute.findMany({
    select: {
      id: true,
      title: true,
      attributeType: true,
      createdAt: true,
    },
  });

  const designAttributesGrouped = designAttributes.reduce(
    (acc, designAttribute) => {
      const { attributeType } = designAttribute;
      if (acc[attributeType]) {
        acc[attributeType].push(designAttribute);
      } else {
        acc[attributeType] = [designAttribute];
      }
      return acc;
    },
    {} as Record<string, typeof designAttributes>
  );

  return json({ layer, designAttributesGrouped });
}

export { action };
export default function NewDesignAttributePage() {
  const data = useLoaderData<typeof loader>();
  const { layer, designAttributesGrouped } = data;

  return (
    <DesignAttributesPicker
      layer={layer}
      designAttributesGrouped={designAttributesGrouped}
    />
  );
}
