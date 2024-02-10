import React from "react";
import { Box, IconButton, useColorMode, useDisclosure } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../Logo";
import Drawer from "../Drawer";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} />
      <Box
        top={0}
        width="100%"
        height={20}
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
        paddingX={4}
        paddingY={2}
      >
        <Box display="flex">
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="none"
            onClick={onOpen}
            mr={4}
          />
          <Logo />
        </Box>
        <IconButton
          aria-label="Trocar tema"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="none"
          onClick={toggleColorMode}
        />
      </Box>
    </>
  );
};

export default Header;
