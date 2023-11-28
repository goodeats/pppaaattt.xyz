import { Box, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from '@remix-run/react';

const Sidebar = () => {
  const bg = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('gray.300', 'gray.700');

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
              <NavLink key={i} to={link.to}>
                <Box
                  paddingX={8}
                  paddingY={2}
                  _hover={{ bg: bgHover }}
                  transition="background-color 0.2s ease-in-out"
                >
                  {link.name}
                </Box>
              </NavLink>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
