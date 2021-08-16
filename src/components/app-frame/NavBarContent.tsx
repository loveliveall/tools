import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  useColorModeValue,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';

import { RoutePath } from '@/routes';

type NavLinkItemProps = {
  to: string,
  label: string,
  exact?: boolean,
};
function NavLinkItem({ to, label, exact }: NavLinkItemProps) {
  const hoverBgColor = useColorModeValue('gray.200', 'gray.600');
  const activeBgColor = useColorModeValue('gray.300', 'gray.500');
  return (
    <Box as="li" listStyleType="none">
      <Button
        as={NavLink}
        to={to}
        exact={exact}
        variant="ghost"
        isFullWidth
        borderRadius={0}
        justifyContent="left"
        _hover={{
          background: hoverBgColor,
        }}
        _active={{
          background: activeBgColor,
        }}
        // `activeStyle` prop is not working, so `sx` prop is used for workaround
        // NavLink sets `active` class on active navlink
        sx={{
          '&.active': {
            background: activeBgColor,
          },
        }}
      >
        {label}
      </Button>
    </Box>
  );
}

function NavBarContent() {
  return (
    <VStack as="ul" w="full" alignItems="stretch" spacing={0}>
      <NavLinkItem
        to={RoutePath.CCPNormal}
        label="컴플리트 가챠 계산기"
      />
    </VStack>
  );
}

export default NavBarContent;
