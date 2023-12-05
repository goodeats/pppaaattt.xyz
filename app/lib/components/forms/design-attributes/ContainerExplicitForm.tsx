import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '~/components';
import { useState } from 'react';

export const ContainerExplicitForm = () => {
  const { width, height, left, top } = explicitValue;

  const WidthForm = () => {
    const [value, setValue] = useState<number>(width);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };

    const isError = value < 0;

    return (
      <FormControl isInvalid={isError}>
        <FormLabel>Width</FormLabel>
        <Input type="number" value={value} onChange={handleChange} />
        {!isError ? (
          <FormHelperText>Must be greater than or equal to zero</FormHelperText>
        ) : (
          <FormErrorMessage>
            Must be greater than or equal to zero
          </FormErrorMessage>
        )}
      </FormControl>
    );
  };

  const HeightForm = () => {
    const [value, setValue] = useState<number>(height);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };

    const isError = value < 0;

    return (
      <FormControl isInvalid={isError}>
        <FormLabel>Height</FormLabel>
        <Input type="number" value={value} onChange={handleChange} />
        {!isError ? (
          <FormHelperText>Must be greater than or equal to zero</FormHelperText>
        ) : (
          <FormErrorMessage>
            Must be greater than or equal to zero
          </FormErrorMessage>
        )}
      </FormControl>
    );
  };

  return (
    <Box>
      <Stack>
        {/* <WidthForm />
        <HeightForm /> */}
      </Stack>
    </Box>
  );
};
