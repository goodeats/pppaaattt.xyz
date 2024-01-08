import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
} from '~/components';

type AuthCardProps = {
  title: string;
  children?: React.ReactNode;
};

export const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {children}
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
};
