import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import App from "@/App";

function Root() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(<Root />);
