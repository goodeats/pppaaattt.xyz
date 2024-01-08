import { FaInstagram, FaGithub } from 'react-icons/fa';
import { Box, Link, SimpleGrid, Stack } from '~/components';

export const Contact = () => {
  const ContactLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return <Link href={href}>{children}</Link>;
  };

  return (
    <Stack mt={8} alignSelf="center" textAlign="left" maxW={400} fontSize={40}>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <ContactLink href="/">
            <FaInstagram />
          </ContactLink>
        </Box>
        <Box>
          <ContactLink href="/">
            <FaGithub />
          </ContactLink>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};
