import { Button, ListItem } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router";

type NavigateButtonProps = {
  path: string;
  onClick?: () => void;
};

const NavigateButton = ({
  children,
  path,
  onClick,
}: PropsWithChildren<NavigateButtonProps>) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === path;

  const handleClick = () => {
    if (!!onClick) {
      onClick();
    }

    navigate(path);
  };

  return (
    <ListItem>
      <Button
        w="100%"
        variant={isActive ? "solid" : "none"}
        justifyContent={"left"}
        onClick={handleClick}
      >
        {children}
      </Button>
    </ListItem>
  );
};

export default NavigateButton;
