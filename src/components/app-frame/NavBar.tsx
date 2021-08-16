import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
} from '@chakra-ui/react';

import { DESKTOP_BP, APP_BAR_HEIGHT, NAV_BAR_WIDTH } from '@/consts';
import NavBarContent from './NavBarContent';

type NavBarProps = {
  isOpen: boolean,
  onClose: () => void,
};
function NavBar({ isOpen, onClose }: NavBarProps) {
  return (
    <>
      {/* Mobile UI */}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent display={{ base: 'flex', [DESKTOP_BP]: 'none' }}>
          <DrawerCloseButton />
          <DrawerHeader>
            Toolbox
          </DrawerHeader>
          <DrawerBody p={0}>
            <NavBarContent onNavBarClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Desktop UI */}
      <Box
        as="nav"
        pos="fixed"
        top={APP_BAR_HEIGHT}
        d={{ base: 'none', [DESKTOP_BP]: 'flex' }}
        w={NAV_BAR_WIDTH}
      >
        <NavBarContent onNavBarClose={onClose} />
      </Box>
    </>
  );
}

export default NavBar;
