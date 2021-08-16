import React from 'react';
import {
  Box,
  Container,
} from '@chakra-ui/react';

import { APP_BAR_HEIGHT, DESKTOP_BP, NAV_BAR_WIDTH } from '@/consts';

type ContentProps = React.PropsWithChildren<{}>;

function Content({ children }: ContentProps) {
  return (
    <Box
      as="main"
      pt={APP_BAR_HEIGHT}
      pl={{ base: 0, [DESKTOP_BP]: NAV_BAR_WIDTH }}
    >
      <Container maxW="container.xl" p={4}>
        {children}
      </Container>
    </Box>
  );
}

export default Content;
