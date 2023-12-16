import { NavLink } from '@remix-run/react';
import { Button, CustomTable } from '~/components';
import { ILayer } from '~/utils/db.server';
import { formatTimeStampsReadable } from '~/utils/string-formatting';

type LayersTableProps = {
  layers: Pick<ILayer, 'id' | 'title' | 'createdAt'>[];
  layerCount?: number;
  caption?: React.ReactNode | string;
  navRoute?: string;
};

export const LayersTable = ({
  layers,
  layerCount,
  caption,
  navRoute = '/dashboard/builder',
}: LayersTableProps) => {
  const DefaultCaption = () => (
    <NavLink to={'/dashboard/builder/layers'} unstable_viewTransition>
      <Button variant="link" colorScheme="blue">
        {layerCount ? `More Layers (${layerCount})` : 'View Layers'}
      </Button>
    </NavLink>
  );

  const columnNames = ['Title', 'Date Added'];

  const rows = layers.map((layer) => {
    const { id, title, createdAt } = layer;

    const titleCell = (
      <NavLink to={`${navRoute}/layers/${id}`}>
        <Button variant="link">{title}</Button>
      </NavLink>
    );
    return {
      cells: [
        { content: titleCell },
        { content: formatTimeStampsReadable(createdAt.toString()) },
      ],
    };
  });

  return (
    <CustomTable
      caption={caption || <DefaultCaption />}
      columnNames={columnNames}
      rows={rows}
    />
  );
};
