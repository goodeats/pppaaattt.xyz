import { NavLink } from '@remix-run/react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '~/components';
import { DeleteLayer } from '~/routes/dashboard+/builder+/layers+/__delete-layer';
import { IDesignAttribute, ILayer, ILayerImage } from '~/utils/db.server';
import { formatTimeStampsReadable } from '~/utils/string-formatting';

type LayerCardProps = {
  layer: Pick<
    ILayer,
    'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'
  > & {
    designAttributes: Pick<
      IDesignAttribute,
      'id' | 'title' | 'attributeType'
    >[];
    image: Pick<
      ILayerImage,
      'id' | 'url' | 'altText' | 'layout' | 'display'
    > | null;
  };
};

export const LayerCardBuild = ({ layer }: LayerCardProps) => {
  const {
    id,
    title,
    description,
    createdAt,
    updatedAt,
    designAttributes,
    image,
  } = layer;

  const Description = () => {
    if (!description) {
      return null;
    }

    return (
      <Box>
        <Text fontSize="xs">{description}</Text>
      </Box>
    );
  };

  const DesignAttributes = () => {
    const NoDesignAttributes = () => (
      <Text fontSize="sm" pt={2}>
        No design attributes available.
      </Text>
    );

    const WithDesignAttributes = () => (
      <>
        {designAttributes.map((designAttribute) => {
          return (
            <Box key={designAttribute.id} p="2">
              <Text fontSize="sm" fontWeight="bold">
                {designAttribute.title}
              </Text>
              <Text fontSize="sm">Type: {designAttribute.attributeType}</Text>
            </Box>
          );
        })}
      </>
    );

    return (
      <Box>
        <Heading size="xs" textTransform="uppercase">
          Design Attributes
        </Heading>
        {!designAttributes || designAttributes.length > 0 ? (
          <WithDesignAttributes />
        ) : (
          <NoDesignAttributes />
        )}
        <Box pt={4}>
          <NavLink to="design-attributes">
            <Button variant="outline">View all</Button>
          </NavLink>
        </Box>
      </Box>
    );
  };

  const LayerImage = () => {
    const NoImage = () => (
      <Text fontSize="sm" pt={2}>
        No image for this layer
      </Text>
    );

    const WithImage = () => {
      if (!image) return null;

      return (
        <Box p="2">
          <Box pb="2">
            <Image
              src={image.url}
              alt={image.altText || 'No alt text'}
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
          <Text fontSize="sm">Alt Text: {image.altText}</Text>
          <Text fontSize="sm">Layout: {image.layout}</Text>
          <Text fontSize="sm">Display: {image.display.toString()}</Text>
        </Box>
      );
    };

    return (
      <Box>
        <Heading size="xs" textTransform="uppercase">
          Image
        </Heading>
        {image ? <WithImage /> : <NoImage />}
        <Box pt={4}>
          <NavLink to="edit-image">
            <Button variant="outline">Edit Image</Button>
          </NavLink>
        </Box>
      </Box>
    );
  };

  const TimeStamps = () => {
    if (!createdAt || !updatedAt) {
      return null;
    }

    return (
      <Box>
        <Text fontSize="xs">
          Created: {formatTimeStampsReadable(createdAt.toString())}
        </Text>
        <Text fontSize="xs">
          Updated: {formatTimeStampsReadable(updatedAt.toString())}
        </Text>
      </Box>
    );
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          <Description />
          <DesignAttributes />
          <LayerImage />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex width="full">
          <TimeStamps />
          <Spacer />
          <ButtonGroup>
            <Link href={`/dashboard/generator/layers/${id}`}>
              <Button>Generate</Button>
            </Link>
            <NavLink to="edit">
              <Button variant="outline">Edit</Button>
            </NavLink>
            <DeleteLayer id={id} />
          </ButtonGroup>
        </Flex>
      </CardFooter>
    </Card>
  );
};
