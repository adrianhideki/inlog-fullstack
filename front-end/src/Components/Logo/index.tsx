import React from "react";
import { Image, Link } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="https://www.inlog.com.br/wp-content/themes/fresh-wp-base/img/logo.png"
        alt="Inlog Logo"
        objectFit="cover"
        width="150px"
      />
    </Link>
  );
};

export default Logo;
