import {
  AccordionButton,
  AccordionIcon,
  Box,
  Text,
  useColorModeValue,
} from '~/components';

type AccordionPanelTextProps = {
  children: React.ReactNode;
  color?: string;
};

export const AccordionPanelText = ({
  children,
  color = 'gray.500',
}: AccordionPanelTextProps) => {
  return (
    <Text p="2" fontSize="sm" textAlign="left" color={color}>
      {children}
    </Text>
  );
};

type SharedAccordionButtonExpandedProps = {
  bgLight?: string;
  bgDark?: string;
  textColorLight?: string;
  textColorDark?: string;
};

type SharedAccordionButtonProps = {
  buttonText: string;
  expandedOptions?: SharedAccordionButtonExpandedProps;
};

const SharedAccordionButtonExpandedDefaultProps = {
  bgLight: 'gray.300',
  bgDark: 'gray.700',
  textColorLight: 'gray.800',
  textColorDark: 'gray.100',
};

export const SharedAccordionButton = ({
  buttonText,
  expandedOptions = SharedAccordionButtonExpandedDefaultProps,
}: SharedAccordionButtonProps) => {
  const { bgLight, bgDark, textColorLight, textColorDark } = expandedOptions;
  const bg = useColorModeValue(bgLight, bgDark);
  const textColor = useColorModeValue(textColorLight, textColorDark);
  return (
    <h2>
      <AccordionButton _expanded={{ bg, textColor }}>
        <Box as="span" flex="1" textAlign="left">
          {buttonText}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  );
};

export type SharedAccordionItemProps = {
  buttonText: string;
  toolTip?: string; // TODO: add tooltip
  panelText?: string;
  children?: React.ReactNode;
};
