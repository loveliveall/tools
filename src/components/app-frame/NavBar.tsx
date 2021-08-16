import React from 'react';
import {
  useDisclosure,
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

function NavBar() {
  const { isOpen, onClose } = useDisclosure();
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
          <DrawerBody>
            <NavBarContent />
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
        <NavBarContent />
      </Box>
    </>
  );
}

export default NavBar;
