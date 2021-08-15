import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Comp1() {
  return <div>Component 1</div>;
}

function Comp2() {
  return <div>Component 2</div>;
}

function App() {
  return (
    <Switch>
      <Route path="/ex1" component={Comp1} />
      <Route path="/ex2" component={Comp2} />
      <Route component={() => <div>Hello World</div>} />
    </Switch>
  );
}

export default App;
