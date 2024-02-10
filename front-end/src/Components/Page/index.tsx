import React, { PropsWithChildren } from "react";
import Header from "../Header";
import { Box } from "@chakra-ui/react";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Header />
      <Box my={4} mx={4}>{children}</Box>
    </Box>
  );
};

export default Page;

