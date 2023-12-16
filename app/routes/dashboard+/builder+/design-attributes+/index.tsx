import { CustomButtonNavGroup, Stack, Text } from '~/components';

export default function DesignAttributesIndexPage() {
  const navs = [
    { to: 'container', title: 'Container' },
    { to: 'palette', title: 'Palette' },
  ];

  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <Text fontSize="sm">Select a Design Attribute</Text>
      <CustomButtonNavGroup navs={navs} />
    </Stack>
  );
}
