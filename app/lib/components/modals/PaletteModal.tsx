import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { SharedModal } from './_shared';

export const PaletteModal = () => {
  const PaletteForm = () => {
    return (
      <FormControl py={4}>
        <FormLabel>Color 0</FormLabel>
        <Input type="text" />
        <FormHelperText>Use a hex code like #FF0000 for red</FormHelperText>
      </FormControl>
    );
  };

  return (
    <SharedModal buttonText="Create Palette" headerText="Palette">
      <PaletteForm />
    </SharedModal>
  );
};
