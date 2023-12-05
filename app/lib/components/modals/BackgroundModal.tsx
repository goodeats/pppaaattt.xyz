import { Input, FormControl, FormLabel, FormHelperText } from '~/components';
import { SharedModal } from './_shared';

export const BackgroundModal = () => {
  const BackgroundForm = () => {
    return (
      <FormControl py={4}>
        <FormLabel>Background</FormLabel>
        <Input type="text" />
        <FormHelperText>Select from Palette</FormHelperText>
      </FormControl>
    );
  };

  return (
    <SharedModal buttonText="Create Background" headerText="Background">
      <BackgroundForm />
    </SharedModal>
  );
};
