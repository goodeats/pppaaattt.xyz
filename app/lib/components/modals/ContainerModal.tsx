import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { SharedModal } from './_shared';

export const ContainerModal = () => {
  const ContainerForm = () => {
    return (
      <FormControl py={4}>
        <FormLabel>Container Width</FormLabel>
        <Input type="number" />
        <FormHelperText>Will be canvas width for first layer</FormHelperText>
      </FormControl>
    );
  };

  return (
    <SharedModal buttonText="Create Container" headerText="Container">
      <ContainerForm />
    </SharedModal>
  );
};
