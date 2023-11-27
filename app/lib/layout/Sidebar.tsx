import { Box, useColorModeValue } from '@chakra-ui/react';

const Sidebar = () => {
  const bg = useColorModeValue('gray.200', 'gray.600');

  const links: string[] = ['Dashboard', 'Builder'];

  return (
    <Box width={200} as="aside" paddingY={22} bg={bg}>
      <Box as="nav" aria-label="Main navigation">
        <Box as="ul" listStyleType="none" margin={0} padding={0}>
          {links.map((link) => (
            <Box as="li" key={link}>
              <Box as="a" href={link.toLowerCase()} display="block" padding={2}>
                {link}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
