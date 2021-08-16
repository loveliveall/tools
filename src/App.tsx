import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Box,
  Text,
} from '@chakra-ui/react';

import AppBar from '@/components/app-frame/AppBar';
import NavBar from '@/components/app-frame/NavBar';
import Content from '@/components/app-frame/Content';

import CCPNormal from '@/pages/ccp-normal';

import { RoutePath } from '@/routes';

function Fallback() {
  return (
    <Text>
      메뉴를 선택해주세요
    </Text>
  );
}

function App() {
  const [navBarOpen, setNavBarOpen] = React.useState(false);
  return (
    <Box>
      <AppBar setNavBarOpen={setNavBarOpen} />
      <NavBar isOpen={navBarOpen} onClose={() => setNavBarOpen(false)} />
      <Content>
        <Switch>
          <Route path={RoutePath.CCPNormal} component={CCPNormal} />
          <Route component={Fallback} />
        </Switch>
      </Content>
    </Box>
  );
}

export default App;
