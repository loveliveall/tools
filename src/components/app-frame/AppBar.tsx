import React from 'react';
import {
  useColorMode,
  Box,
  HStack,
  Heading,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';

import { APP_BAR_HEIGHT } from '@/consts';

function AppBar() {
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
        <Heading size="md">
          ToolBox
        </Heading>
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
