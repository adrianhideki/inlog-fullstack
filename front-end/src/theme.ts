import { mode } from "@chakra-ui/theme-tools";
import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "system",
  useSystemColorMode: true,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "body",
        color: mode("grey.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        lineHeight: "base",
      },
    }),
  },
});

export default theme;
