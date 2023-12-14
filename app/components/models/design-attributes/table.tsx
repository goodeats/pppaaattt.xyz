import { NavLink } from '@remix-run/react';
import { Button, CustomTable } from '~/components';
import { IDesignAttribute } from '~/utils/db.server';
import { formatTimeStampsReadable } from '~/utils/string-formatting';

type DesignAttributesTableProps = {
  designAttributes: Pick<
    IDesignAttribute,
    'id' | 'title' | 'attributeType' | 'createdAt'
  >[];
  caption?: React.ReactNode | string;
};

export const DesignAttributesTable = ({
  designAttributes,
  caption,
}: DesignAttributesTableProps) => {
  const DefaultCaption = () => (
    <NavLink to={'/dashboard/builder/design-attributes'}>
      <Button variant="link" colorScheme="blue">
        View Design Attributes
      </Button>
    </NavLink>
  );

  const columnNames = ['Title', 'Attribute Type', 'Date Added'];

  const rows = designAttributes.map((designAttribute) => {
    const { id, title, attributeType, createdAt } = designAttribute;

    const titleCell = (
      <NavLink
        to={`/dashboard/builder/design-attributes/${attributeType}/${id}`}
      >
        <Button variant="link">{title}</Button>
      </NavLink>
    );
    return {
      cells: [
        { content: titleCell },
        { content: attributeType },
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
