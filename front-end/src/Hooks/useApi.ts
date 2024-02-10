import React, { useContext } from "react";
import { ApiContext } from "../Contexts/ApiContext";

function useApi<T>(name: string): T {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("ApiContext inválido");
  }

  return context.getApi<T>(name);
}

export { useApi };
