import { CustomButtonNavGroup, Stack, Text } from '~/components';

export default function BuilderIndexPage() {
  const navs = [
    { to: 'layers', title: 'Layers' },
    { to: 'design-attributes', title: 'Design Attributes' },
  ];

  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <Text fontSize="sm">Here is where you will customize the builds</Text>
      <CustomButtonNavGroup navs={navs} />
    </Stack>
  );
}
