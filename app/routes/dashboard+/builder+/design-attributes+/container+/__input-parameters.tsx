import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NavLink } from '@remix-run/react';
import { InputParameter } from '~/utils/db.server';
import {
  InputParameterContainerExplicitValuesType,
  InputParameterContainerRandomValuesType,
  InputParameterContainerRangeValuesType,
} from '~/utils/types/input-parameter/container';
import { RangeValuesType } from '~/utils/types/input-parameter/global';

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}

enum UnitTypeDisplayEnum {
  px = 'px',
  percent = '%',
}

type ContainerInputParameterEditorProps = {
  inputParameter: Pick<
    InputParameter,
    | 'id'
    | 'inputType'
    | 'unitType'
    | 'explicitValues'
    | 'randomValues'
    | 'rangeValues'
  >;
};

export function ContainerInputParameters({
  inputParameter,
}: ContainerInputParameterEditorProps) {
  const { inputType, unitType } = inputParameter;
  const unitTypeDisplay = UnitTypeDisplayEnum[unitType];
  const unitKey = unitType as keyof typeof UnitTypeEnum;

  const InputParameterActions = () => {
    return (
      <Stack>
        <ButtonGroup>
          <NavLink to={'input-parameters'}>
            <Button variant="outline">Edit</Button>
          </NavLink>
        </ButtonGroup>
      </Stack>
    );
  };

  const InputParameterExplicitValues = () => {
    const values =
      inputParameter.explicitValues as InputParameterContainerExplicitValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;
    return (
      <Stack>
        <Text>Explicit Values</Text>
        <List>
          <ListItem>
            Width: {width.toString()}
            {unitTypeDisplay}
          </ListItem>
          <ListItem>
            Height: {height.toString()}
            {unitTypeDisplay}
          </ListItem>
          <ListItem>
            Top: {top.toString()}
            {unitTypeDisplay}
          </ListItem>
          <ListItem>
            Left: {left.toString()}
            {unitTypeDisplay}
          </ListItem>
        </List>
      </Stack>
    );
  };

  const InputParameterRandomValues = () => {
    const values =
      inputParameter.randomValues as InputParameterContainerRandomValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;

    const numberArrayToString = (numbers: number[]) => {
      return numbers
        .map((num: number) => `${num}${unitTypeDisplay}`)
        .join(', ');
    };

    return (
      <Stack>
        <Text>Random Values (evenly distributed)</Text>
        <List>
          <ListItem>Width: {numberArrayToString(width)}</ListItem>
          <ListItem>Height: {numberArrayToString(height)}</ListItem>
          <ListItem>Top: {numberArrayToString(top)}</ListItem>
          <ListItem>Left: {numberArrayToString(left)}</ListItem>
        </List>
      </Stack>
    );
  };

  const InputParameterRangeValues = () => {
    const values =
      inputParameter.rangeValues as InputParameterContainerRangeValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;

    const formatRange = ({ min, max }: RangeValuesType) => {
      const rangeMin = `${min}${unitTypeDisplay}`;
      const rangeMax = `${max}${unitTypeDisplay}`;
      return `${rangeMin} - ${rangeMax}`;
    };

    return (
      <Stack>
        <Text>Range Values</Text>
        <List>
          <ListItem>Width: {formatRange(width)}</ListItem>
          <ListItem>Height: {formatRange(height)}</ListItem>
          <ListItem>Top: {formatRange(top)}</ListItem>
          <ListItem>Left: {formatRange(left)}</ListItem>
        </List>
      </Stack>
    );
  };

  const InputParameterValuesByType = () => {
    switch (inputType) {
      case 'explicit':
        return <InputParameterExplicitValues />;
      case 'random':
        return <InputParameterRandomValues />;
      case 'range':
        return <InputParameterRangeValues />;
      default:
        return null;
    }
  };

  return (
    <Stack>
      <Text>Container Parameters:</Text>
      <List>
        <ListItem>Input Type: {inputType}</ListItem>
        <ListItem>Unit Type: {unitType}</ListItem>
      </List>
      <InputParameterValuesByType />
      <InputParameterActions />
    </Stack>
  );
}
