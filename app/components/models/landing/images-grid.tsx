import { Box, Image, SimpleGrid } from '~/components';

export const ImagesGrid = () => {
  const ImageBox = ({ id }: { id: number }) => {
    return (
      <Box>
        <Image
          src={`/images/landing/${id}.png`}
          alt={'Too many triangles'}
          objectFit="cover"
        />
      </Box>
    );
  };

  return (
    <SimpleGrid columns={[1, null, 2]} spacing={10}>
      {[...Array(4)].map((_, i) => (
        <ImageBox key={i} id={i} />
      ))}
    </SimpleGrid>
  );
};
