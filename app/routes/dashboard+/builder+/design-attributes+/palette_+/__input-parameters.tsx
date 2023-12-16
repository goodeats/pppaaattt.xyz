import {
  Button,
  ButtonGroup,
  InputParametersActions,
  InputParametersBody,
  InputParametersStack,
  InputParametersTitle,
  Stack,
  Text,
} from '~/components';
import { NavLink } from '@remix-run/react';
import { InputParameter } from '~/utils/db.server';
import {
  formatNumberArrayToString,
  formatRangeToString,
} from '~/utils/string-formatting';
import {
  InputParameterPaletteExplicitValuesType,
  InputParameterPaletteRandomValuesType,
  InputParameterPaletteRangeValuesType,
} from '~/utils/types/input-parameter/palette';

enum UnitTypeEnum {
  hexcode = 'hexcode',
}

enum UnitTypeDisplayEnum {
  hexcode = 'hexcode',
}

type PaletteInputParameterEditorProps = {
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

export function PaletteInputParameters({
  inputParameter,
}: PaletteInputParameterEditorProps) {
  const { inputType, unitType } = inputParameter;
  if (unitType !== 'hexcode') {
    throw new Error(`Invalid unitType: ${unitType}. Expected 'hexcode'.`);
  }
  const unitTypeDisplay = UnitTypeDisplayEnum[unitType];
  const unitKey = unitType as keyof typeof UnitTypeEnum;

  type InputContentOverviewProps = {
    title: string;
    linkTo: string;
    linkText: string;
    children?: React.ReactNode | string;
  };

  const InputContentOverview = ({
    title,
    linkTo,
    linkText,
    children,
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
        {children}
        <InputParameterActions />
      </Stack>
    );
  };

  const InputParameterTypes = () => {
    const values = [`Input Type: ${inputType}`, `Unit Type: ${unitType}`];

    return (
      <InputParametersStack>
        <InputParametersTitle title="Parameter Types" />
        <InputParametersBody values={values} />
        <InputParametersActions linkTo={'edit-type'} linkText={'Edit Types'} />
      </InputParametersStack>
    );
  };

  const InputParameterExplicitValues = () => {
    const values =
      inputParameter.explicitValues as InputParameterPaletteExplicitValuesType;
    const currentValues = values[unitKey];

    return (
      <InputParametersStack>
        <InputParametersTitle title="Explicit Values" />
        <InputParametersBody values={currentValues} attributeType="palette" />
        <InputParametersActions
          linkTo={'edit-input-parameter-values-explicit'}
          linkText={'Edit Explicit Values'}
        />
      </InputParametersStack>
    );
  };

  const InputParameterRandomValues = () => {
    const values =
      inputParameter.randomValues as InputParameterPaletteRandomValuesType;
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
      inputParameter.rangeValues as InputParameterPaletteRangeValuesType;
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
      // case 'random':
      //   return <InputParameterRandomValues />;
      // case 'range':
      //   return <InputParameterRangeValues />;
      default:
        return null;
    }
  };

  return (
    <Stack>
      <Text fontSize="large">Palette Parameters</Text>
      <Stack spacing={5}>
        <InputParameterTypes />
        <InputParameterValuesByType />
      </Stack>
    </Stack>
  );
}
