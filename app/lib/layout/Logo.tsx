// Importing necessary components from Chakra UI
import { Box, Flex } from '~/components';

// Character component is responsible for creating a recursive layout of the letters in the logo
const Character = ({ char }: { char: string }) => {
  return (
    <Flex direction="column">
      {/* It maps over an array of length 2 and for each element, it creates a Box component */}
      {[...Array(2)].map((_, i) => (
        <Box key={i} margin="0 auto" lineHeight="normal">
          {/* The Box component contains the character repeated (i + 1) times */}
          {char.repeat(i + 1)}
        </Box>
      ))}
    </Flex>
  );
};

const Logo = () => {
  const str = 'PAT';
  return (
    <Flex direction="column">
      {/* It first renders the Character component for the first character of the string */}
      <Character char={str[0]} />
      <Flex>
        {/* Then it maps over the rest of the string and for each character, it renders a Character component */}
        {str
          .slice(1)
          .split('')
          .map((char, i) => (
            <Character key={i} char={char} />
          ))}
      </Flex>
    </Flex>
  );
};

export default Logo;
