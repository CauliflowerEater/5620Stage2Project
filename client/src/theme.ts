import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "white", // 设置浅色模式下的背景为白色
        color: "black",
        _dark: {
          bg: "gray.800", // 深色模式的背景色
          color: "white",
        },
      },
    },
  },
});

export default theme;
