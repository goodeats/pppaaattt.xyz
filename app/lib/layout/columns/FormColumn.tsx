import Column from '../Column';
import LayerCard from '../../components/cards/LayerCard';
import { ColumnHeading } from './_shared';

const FormColumn = () => {
  return (
    <Column>
      <ColumnHeading>Input</ColumnHeading>
      <LayerCard depth={0} />
    </Column>
  );
};

export default FormColumn;
