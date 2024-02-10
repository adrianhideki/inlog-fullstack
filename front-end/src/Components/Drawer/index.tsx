import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerProps,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
} from "@chakra-ui/react";
import Logo from "../Logo";
import NavigateButton from "./NavigateButton";

const Drawer = ({ onClose, ...props }: Omit<DrawerProps, "children">) => {
  return (
    <ChakraDrawer placement="left" onClose={onClose} {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <List>
            <NavigateButton onClick={onClose} path="/">
              Início
            </NavigateButton>
            <NavigateButton onClick={onClose} path="/cadastrar">
              Cadastro de Veículos
            </NavigateButton>
          </List>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
