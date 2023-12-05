import { NavLink } from '@remix-run/react';
import React from 'react';
import { Box, Button, ButtonGroup, useColorModeValue } from '~/components';

type ButtonNavProps = {
  to: string;
  title: string;
};

type CustomButtonNavGroupProps = {
  navs: ButtonNavProps[];
};

export const CustomButtonNavGroup = ({ navs }: CustomButtonNavGroupProps) => {
  const bgActive = useColorModeValue('gray.100', 'gray.800');
  const bgHover = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box as="nav" aria-label="Builder navigation" marginBottom={3}>
      <ButtonGroup variant="outline">
        {navs.map((nav, i) => (
          <NavLink key={i} to={nav.to}>
            {({ isActive, isPending }) => (
              <Button
                bg={isActive ? bgActive : undefined}
                _hover={{ bg: bgHover }}
                transition="background-color 0.2s ease-in-out"
                disabled={isPending}
              >
                {nav.title}
              </Button>
            )}
          </NavLink>
        ))}
      </ButtonGroup>
    </Box>
  );
};
