import React from 'react';
import {
  useColorMode,
  Box,
  HStack,
  Heading,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { BiSun, BiMoon, BiMenu } from 'react-icons/bi';

import { APP_BAR_HEIGHT, DESKTOP_BP } from '@/consts';

type AppBarProps = {
  setNavBarOpen: (newV: boolean) => void,
};
function AppBar({ setNavBarOpen }: AppBarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="header"
      pos="fixed"
      zIndex={10}
      w="full"
      h={APP_BAR_HEIGHT}
    >
      <HStack h="full" p={4}>
        <HStack>
          <IconButton
            aria-label="Open navbar"
            display={{ base: 'inline-flex', [DESKTOP_BP]: 'none' }}
            onClick={() => setNavBarOpen(true)}
            icon={<BiMenu />}
            variant="ghost"
          />
          <Heading size="md">
            ToolBox
          </Heading>
        </HStack>
        <Spacer />
        <IconButton
          aria-label="Switch color mode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <BiMoon /> : <BiSun />}
          variant="ghost"
        />
      </HStack>
    </Box>
  );
}

export default AppBar;
