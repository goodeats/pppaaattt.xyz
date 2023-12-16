import { Button, ButtonGroup, Stack, Text } from '~/components';
import { NavLink } from '@remix-run/react';
import { InputParameter } from '~/utils/db.server';
import {
  formatNumberArrayToString,
  formatRangeToString,
} from '~/utils/string-formatting';
import {
  InputParameterContainerExplicitValuesType,
  InputParameterContainerRandomValuesType,
  InputParameterContainerRangeValuesType,
} from '~/utils/types/input-parameter/container';

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
  const unitTypeDisplay =
    UnitTypeDisplayEnum[unitType as keyof typeof UnitTypeEnum];
  const unitKey = unitType as keyof typeof UnitTypeEnum;

  type InputContentOverviewProps = {
    title: string;
    values: string[];
    linkTo: string;
    linkText: string;
  };

  const InputContentOverview = ({
    title,
    values,
    linkTo,
    linkText,
  }: InputContentOverviewProps) => {
    const InputParameterActions = () => {
      return (
        <Stack>
          <ButtonGroup>
            <NavLink to={linkTo}>
              <Button variant="outline">{linkText}</Button>
            </NavLink>
          </ButtonGroup>
        </Stack>
      );
    };

    return (
      <Stack>
        <Text fontSize="medium">{title}</Text>
        {values.map((value) => (
          <Text fontSize="small">{value}</Text>
        ))}
        <InputParameterActions />
      </Stack>
    );
  };

  const InputParameterTypes = () => {
    return (
      <InputContentOverview
        title="Parameter Types"
        values={[`Input Type: ${inputType}`, `Unit Type: ${unitType}`]}
        linkTo={'edit-input-parameter-types'}
        linkText={'Edit Types'}
      />
    );
  };

  const InputParameterExplicitValues = () => {
    const values =
      inputParameter.explicitValues as InputParameterContainerExplicitValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;

    return (
      <InputContentOverview
        title="Explicit Values"
        values={[
          `Width: ${width.toString()}${unitTypeDisplay}`,
          `Height: ${height.toString()}${unitTypeDisplay}`,
          `Top: ${top.toString()}${unitTypeDisplay}`,
          `Left: ${left.toString()}${unitTypeDisplay}`,
        ]}
        linkTo={'edit-input-parameter-values-explicit'}
        linkText={'Edit Explicit Values'}
      />
    );
  };

  const InputParameterRandomValues = () => {
    const values =
      inputParameter.randomValues as InputParameterContainerRandomValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;

    return (
      <InputContentOverview
        title="Random Values**"
        values={[
          `Width: ${formatNumberArrayToString(width, unitTypeDisplay)}`,
          `Height: ${formatNumberArrayToString(height, unitTypeDisplay)}`,
          `Top: ${formatNumberArrayToString(top, unitTypeDisplay)}`,
          `Left: ${formatNumberArrayToString(left, unitTypeDisplay)}`,
          `** evenly distributed probability`,
        ]}
        linkTo={'edit-input-parameter-values-random'}
        linkText={'Edit Random Values'}
      />
    );
  };

  const InputParameterRangeValues = () => {
    const values =
      inputParameter.rangeValues as InputParameterContainerRangeValuesType;
    const currentValues = values[unitKey];
    const { width, height, top, left } = currentValues;

    return (
      <InputContentOverview
        title="Range Values"
        values={[
          `Width: ${formatRangeToString(width, unitTypeDisplay)}`,
          `Height: ${formatRangeToString(height, unitTypeDisplay)}`,
          `Top: ${formatRangeToString(top, unitTypeDisplay)}`,
          `Left: ${formatRangeToString(left, unitTypeDisplay)}`,
        ]}
        linkTo={'edit-input-parameter-values-range'}
        linkText={'Edit Range Values'}
      />
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
      <Text fontSize="large">Container Parameters</Text>
      <Stack spacing={5}>
        <InputParameterTypes />
        <InputParameterValuesByType />
      </Stack>
    </Stack>
  );
}
