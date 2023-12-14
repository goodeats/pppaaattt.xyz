import { NavLink } from '@remix-run/react';
import { Button, CustomTable } from '~/components';

type DesignAttributesTableProps = {
  designAttributes: {
    attributeType: string;
    count: number;
  }[];
};

export const DesignAttributesTableBuilder = ({
  designAttributes,
}: DesignAttributesTableProps) => {
  const Caption = () => (
    <NavLink to={'/dashboard/builder/design-attributes'}>
      <Button variant="link" colorScheme="blue">
        Select Design Attribute
      </Button>
    </NavLink>
  );

  const columnNames = ['Attribute Type', 'Count'];

  const rows = designAttributes.map((designAttribute) => {
    const { attributeType, count } = designAttribute;

    const titleCell = (
      <NavLink to={`/dashboard/builder/design-attributes/${attributeType}`}>
        <Button variant="link">{attributeType}</Button>
      </NavLink>
    );
    return {
      cells: [{ content: titleCell }, { content: count }],
    };
  });

  return (
    <CustomTable caption={<Caption />} columnNames={columnNames} rows={rows} />
  );
};
