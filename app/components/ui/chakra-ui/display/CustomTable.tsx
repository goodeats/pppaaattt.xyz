import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '~/components';

type RowCell = {
  content: React.ReactNode | string;
};

type Row = {
  cells: RowCell[];
};

type CustomTableProps = {
  caption?: string | React.ReactNode;
  columnNames?: string[];
  rows: Row[];
};

export const CustomTable = ({
  caption,
  columnNames,
  rows,
}: CustomTableProps) => {
  const Caption = () => <TableCaption>{caption}</TableCaption>;

  const Header = () => (
    <Thead>
      <Tr>
        {columnNames?.map((columnName) => (
          <Th key={columnName}>{columnName}</Th>
        ))}
      </Tr>
    </Thead>
  );

  const Body = () => (
    <Tbody>
      {rows.map((row, i) => (
        <Tr key={i}>
          {row.cells.map((cell, j) => (
            <Td key={j}>{cell.content}</Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );

  return (
    <TableContainer width="full">
      <Table variant="simple" colorScheme="whiteAlpha">
        {caption && <Caption />}
        {columnNames && <Header />}
        <Body />
      </Table>
    </TableContainer>
  );
};
