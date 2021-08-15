import React from 'react';
import {
  Box,
  Container,
} from '@chakra-ui/react';

import { APP_BAR_HEIGHT } from '@/consts';

type ContentProps = React.PropsWithChildren<{}>;

function Content({ children }: ContentProps) {
  return (
    <Box
      as="main"
      pt={APP_BAR_HEIGHT}
    >
      <Container maxW="container.xl" p={4}>
        {children}
      </Container>
    </Box>
  );
}

export default Content;
