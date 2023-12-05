import { Stack, Text } from '~/components';
import { formatTimeStampsReadable } from '~/utils/string-formatting';

type ContentItemType = {
  title: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type ContentOverviewProps = {
  item: ContentItemType;
};

export const ContentOverview = ({ item }: ContentOverviewProps) => {
  const { title, description, createdAt, updatedAt } = item;

  const DescriptionText = () => {
    if (!description) {
      return null;
    }

    return <Text fontSize="small">{description}</Text>;
  };

  const TimeStampsText = () => {
    if (!createdAt || !updatedAt) {
      return null;
    }

    return (
      <Stack>
        <Text fontSize="small">
          Created: {formatTimeStampsReadable(createdAt)}
        </Text>
        <Text fontSize="small">
          Updated: {formatTimeStampsReadable(updatedAt)}
        </Text>
      </Stack>
    );
  };

  return (
    <Stack>
      <Text fontSize="lg">{title}</Text>

      <DescriptionText />
      <TimeStampsText />
    </Stack>
  );
};
