import React, { PropsWithChildren } from "react";
import Header from "../Header";
import { Box, Heading, Stack } from "@chakra-ui/react";

type PageProps = {
  title: string;
};

const Page = ({ title, children }: PropsWithChildren<PageProps>) => {
  return (
    <Box>
      <Header />
      <Stack px={4} >
        <Heading size="md">{title}</Heading>
        <Box my={4} mx={4}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
