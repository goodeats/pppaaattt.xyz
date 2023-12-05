import { Box, Radio, RadioGroup, Stack } from '~/components';
import { useState } from 'react';
import { InputParameterType } from '../../../utils/store';

type InputTypeFormProps = {
  inputType: InputParameterType;
  onChange: (nextValue: InputParameterType) => void;
};

export const InputTypeForm = ({ inputType, onChange }: InputTypeFormProps) => {
  const [value, setValue] = useState<InputParameterType>(inputType);

  const handleChange = (nextValue: string) => {
    setValue(nextValue as InputParameterType);
    onChange(nextValue as InputParameterType);
  };

  return (
    <Box>
      <RadioGroup onChange={handleChange} value={value}>
        <Stack direction="row">
          <Radio value="explicit">explicit</Radio>
          {/* temporarily disabling these */}
          {/* want to make sure explicit works first */}
          <Radio value="random" isDisabled>
            random
          </Radio>
          <Radio value="range" isDisabled>
            range
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};
