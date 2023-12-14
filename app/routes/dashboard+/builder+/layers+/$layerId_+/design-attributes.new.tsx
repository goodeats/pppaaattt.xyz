import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';
import { DesignAttributesPicker, action } from './__design-attributes-picker';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;

  const layer = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
    select: {
      id: true,
      title: true,
      designAttributes: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!layer) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/builder/layers?notFound=true');
  }

  const designAttributes = await prisma.designAttribute.findMany({
    where: {
      layerId: null,
    },
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
