import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#hehehe",
    },
  },
});

export default theme;
