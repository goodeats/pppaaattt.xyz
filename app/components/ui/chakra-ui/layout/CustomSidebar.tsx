import { Form, NavLink } from '@remix-run/react';
import React, { useRef } from 'react';
import { Box, Button, Flex, useColorModeValue } from '~/components';

type ItemsType = {
  id: string;
  title: string;
};

type CustomSidebarProps = {
  items: ItemsType[];
  itemType?: string;
};

export const CustomSidebar = ({
  items,
  itemType = 'items',
}: CustomSidebarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const bg = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('gray.300', 'gray.700');
  const bgActive = useColorModeValue('gray.100', 'gray.800');

  const Logout = () => {
    return (
      <Box>
        <Form action="/logout" method="POST" ref={formRef}>
          <Button type="submit" width="full">
            Logout
          </Button>
        </Form>
      </Box>
    );
  };

  return (
    <Box
      width={200}
      as="aside"
      paddingY={22}
      bg={bg}
      borderRight="1px"
      borderColor="gray.300"
    >
      <Box as="nav" height="full" aria-label={`${itemType} navigation`}>
        <Flex
          width="full"
          height="full"
          flexDirection="column"
          justifyContent="space-between"
        >
          {items.length === 0 && (
            <Box as="p" padding={2}>
              No {itemType} found.
            </Box>
          )}
          <Box as="ul" listStyleType="none" margin={0} padding={0}>
            {items.map((item, i) => {
              const { id, title } = item;
              return (
                <Box as="li" key={i}>
                  <NavLink to={id}>
                    {({ isActive, isPending }) => (
                      <Box
                        paddingX={8}
                        paddingY={2}
                        bg={isActive ? bgActive : undefined}
                        _hover={{ bg: bgHover }}
                        transition="background-color 0.2s ease-in-out"
                      >
                        {title}
                      </Box>
                    )}
                  </NavLink>
                </Box>
              );
            })}
          </Box>
          <Logout />
        </Flex>
      </Box>
    </Box>
  );
};
