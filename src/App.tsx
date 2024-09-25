import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import AppBar from "@/components/app-frame/AppBar";
import NavBar from "@/components/app-frame/NavBar";
import Content from "@/components/app-frame/Content";

import CCPNormal from "@/pages/ccp-normal";
import CCPSimulation from "@/pages/ccp-simulation";
import GachaNormal from "@/pages/gacha-normal";

import { RoutePath } from "@/routes";

function Fallback() {
  return <Text>메뉴를 선택해주세요</Text>;
}

function App() {
  const location = useLocation();
  const [navBarOpen, setNavBarOpen] = React.useState(false);

  React.useEffect(() => {
    // Reset viewport whenever url changes
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Box>
      <AppBar setNavBarOpen={setNavBarOpen} />
      <NavBar isOpen={navBarOpen} onClose={() => setNavBarOpen(false)} />
      <Content>
        <Routes>
          <Route path={RoutePath.CCPNormal} element={<CCPNormal />} />
          <Route path={RoutePath.CCPSimulation} element={<CCPSimulation />} />
          <Route path={RoutePath.GachaNormal} element={<GachaNormal />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </Content>
    </Box>
  );
}

export default App;
