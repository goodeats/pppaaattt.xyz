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
  Link,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '~/components';
import { IDesignAttribute, ILayer } from '~/utils/db.server';
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
  };
};

export const LayerCardGenerate = ({ layer }: LayerCardProps) => {
  const { id, title, description, createdAt, updatedAt, designAttributes } =
    layer;

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
        Coming soon: redesign from here
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
        {/* <Box pt={4}>
          <NavLink to="design-attributes">
            <Button variant="outline">View all</Button>
          </NavLink>
        </Box> */}
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
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex width="full">
          <TimeStamps />
          <Spacer />
          <ButtonGroup>
            <Link href={`/dashboard/builder/layers/${id}`}>
              <Button>Build</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </CardFooter>
    </Card>
  );
};
