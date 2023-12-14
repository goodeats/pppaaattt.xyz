import { NavLink } from '@remix-run/react';
import { Button, CustomTable } from '~/components';
import { ILayer } from '~/utils/db.server';
import { formatTimeStampsReadable } from '~/utils/string-formatting';

type LayersTableProps = {
  layers: Pick<ILayer, 'id' | 'title' | 'createdAt'>[];
  layerCount: number;
};

export const LayersTable = ({ layers, layerCount }: LayersTableProps) => {
  const Caption = () => (
    <NavLink to={'/dashboard/builder/layers'} unstable_viewTransition>
      <Button variant="link" colorScheme="blue">
        More Layers ({layerCount})
      </Button>
    </NavLink>
  );

  const columnNames = ['Title', 'Date Added'];

  const rows = layers.map((layer) => {
    const { id, title, createdAt } = layer;

    const titleCell = (
      <NavLink to={`/dashboard/builder/layers/${id}`}>
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
    <CustomTable caption={<Caption />} columnNames={columnNames} rows={rows} />
  );
};
