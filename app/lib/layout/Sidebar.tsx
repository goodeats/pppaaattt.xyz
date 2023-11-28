import { Box, useColorModeValue } from '@chakra-ui/react';

const Sidebar = () => {
  const bg = useColorModeValue('gray.200', 'gray.600');

  type NavLink = {
    name: string;
    to: string;
  };
  const links: NavLink[] = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Builder', to: '/dashboard/builder' },
  ];

  return (
    <Box width={200} as="aside" paddingY={22} bg={bg}>
      <Box as="nav" aria-label="Main navigation">
        <Box as="ul" listStyleType="none" margin={0} padding={0}>
          {links.map((link, i) => (
            <Box as="li" key={i}>
              <Box as="a" href={link.to} display="block" padding={2}>
                {link.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
