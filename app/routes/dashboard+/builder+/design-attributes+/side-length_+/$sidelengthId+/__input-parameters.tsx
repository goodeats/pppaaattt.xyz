import {
  InputParametersActions,
  InputParametersBody,
  InputParametersStack,
  InputParametersTitle,
  Stack,
  Text,
} from '~/components';
import { InputParameter } from '~/utils/db.server';
import {
  InputParameterSideLengthExplicitValuesType,
  InputParameterSideLengthRandomValuesType,
  InputParameterSideLengthRangeValuesType,
} from '~/utils/types/input-parameter/side-length';
import { colorRandomHex } from '~/utils/color-utils';

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}

enum UnitTypeDisplayEnum {
  px = 'px',
  percent = '%',
}

type SideLengthInputParameterEditorProps = {
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

export function SideLengthInputParameters({
  inputParameter,
}: SideLengthInputParameterEditorProps) {
  const { inputType, unitType } = inputParameter;
  const unitTypeDisplay =
    UnitTypeDisplayEnum[unitType as keyof typeof UnitTypeEnum];
  const unitKey = unitType as keyof typeof UnitTypeEnum;

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
      inputParameter.explicitValues as InputParameterSideLengthExplicitValuesType;
    const currentValues = values[unitKey];
    const valuesDisplay = [
      `Length: ${currentValues.toString()}${unitTypeDisplay}`,
    ];

    return (
      <InputParametersStack>
        <InputParametersTitle title="Explicit Values" />
        <InputParametersBody values={valuesDisplay} />
        <InputParametersActions
          linkTo={'edit-values-explicit'}
          linkText={'Edit Explicit Values'}
        />
      </InputParametersStack>
    );
  };

  const InputParameterRandomValues = () => {
    const values =
      inputParameter.randomValues as InputParameterSideLengthRandomValuesType;
    const currentValues = values[unitKey];
    const randomColors = [];
    for (let i = 0; i < currentValues; i++) {
      randomColors.push(colorRandomHex());
    }

    return (
      <InputParametersStack>
        <InputParametersTitle title="Random Values" />
        <InputParametersBody values={randomColors} attributeType="palette" />
        <InputParametersActions
          linkTo={'edit-values-random'}
          linkText={'Edit Random Values'}
        />
      </InputParametersStack>
    );
  };

  const InputParameterValuesByType = () => {
    switch (inputType) {
      case 'explicit':
        return <InputParameterExplicitValues />;
      case 'random':
        return <InputParameterRandomValues />;
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
