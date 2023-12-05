import { Stack, StackDivider } from '~/components';
import { SharedModal } from './_shared';
import { ContainerExplicitForm } from '../forms/design-attributes/ContainerExplicitForm';

export const ContainerModal = () => {
  return (
    <SharedModal buttonText="Update Container" headerText="Container">
      <Stack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
        <ContainerExplicitForm />
      </Stack>
    </SharedModal>
  );
};
