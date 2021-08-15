import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Box,
} from '@chakra-ui/react';

import AppBar from '@/components/app-frame/AppBar';
import Content from '@/components/app-frame/Content';

function Comp1() {
  return <div>Component 1</div>;
}

function Comp2() {
  return <div>Component 2</div>;
}

function App() {
  return (
    <Box>
      <AppBar />
      <Content>
        <Switch>
          <Route path="/ex1" component={Comp1} />
          <Route path="/ex2" component={Comp2} />
          <Route component={() => <div>Hello World</div>} />
        </Switch>
      </Content>
    </Box>
  );
}

export default App;
