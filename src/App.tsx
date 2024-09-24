import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import AppBar from "@/components/app-frame/AppBar";
import NavBar from "@/components/app-frame/NavBar";
import Content from "@/components/app-frame/Content";

import CCPNormal from "@/pages/ccp-normal";
import GachaNormal from "@/pages/gacha-normal";

import { RoutePath } from "@/routes";

function Fallback() {
  return <Text>메뉴를 선택해주세요</Text>;
}

function App() {
  const [navBarOpen, setNavBarOpen] = React.useState(false);
  return (
    <Box>
      <AppBar setNavBarOpen={setNavBarOpen} />
      <NavBar isOpen={navBarOpen} onClose={() => setNavBarOpen(false)} />
      <Content>
        <Routes>
          <Route path={RoutePath.CCPNormal} element={<CCPNormal />} />
          <Route path={RoutePath.GachaNormal} element={<GachaNormal />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </Content>
    </Box>
  );
}

export default App;
