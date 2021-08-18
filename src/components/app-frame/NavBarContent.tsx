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
  onNavBarClose: () => void,
};
function NavLinkItem({
  to, label, exact, onNavBarClose,
}: NavLinkItemProps) {
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const activeBgColor = useColorModeValue('gray.300', 'gray.600');
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
        onClick={onNavBarClose}
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

type NavBarContentProps = {
  onNavBarClose: () => void,
};
function NavBarContent({ onNavBarClose }: NavBarContentProps) {
  return (
    <VStack as="ul" w="full" alignItems="stretch" spacing={0} pt={2}>
      <NavLinkItem
        to={RoutePath.GachaNormal}
        label="가챠 확률 계산기"
        onNavBarClose={onNavBarClose}
      />
      <NavLinkItem
        to={RoutePath.CCPNormal}
        label="컴플리트 가챠 계산기"
        onNavBarClose={onNavBarClose}
      />
    </VStack>
  );
}

export default NavBarContent;
