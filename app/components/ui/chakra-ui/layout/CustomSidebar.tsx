import { NavLink } from '@remix-run/react';
import React from 'react';
import { Box, useColorModeValue } from '~/components';

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
  const bg = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('gray.300', 'gray.700');
  const bgActive = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box
      width={200}
      as="aside"
      paddingY={22}
      bg={bg}
      borderRight="1px"
      borderColor="gray.300"
    >
      <Box as="nav" aria-label={`${itemType} navigation`}>
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
      </Box>
    </Box>
  );
};
