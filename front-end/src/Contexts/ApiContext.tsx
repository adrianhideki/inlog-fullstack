import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

type ApiContextProps = {
  getApi<T>(name: string): T;
  apis: Map<string, object>;
};

type ApiProviderProps = {
  apis: { name: string; api: object }[];
};

const ApiContext = createContext<ApiContextProps>({} as ApiContextProps);

const ApiProvider = ({
  children,
  apis,
}: PropsWithChildren<ApiProviderProps>) => {
  const [apiMap, setApiMap] = useState<Map<string, object>>(new Map());

  useEffect(() => {
    let list = new Map();

    apis.forEach((item) => {
      list.set(item.name, item.api);
    });

    setApiMap(list);
  }, [apis]);

  function handleGetApi<T>(name: string): T {
    if (apiMap.size === 0) {
      return undefined as T;
    }

    if (!apiMap.has(name)) {
      throw new Error(`Nome da api '${name}' não configurada`);
    }

    const api = apiMap.get(name) as T;

    return api;
  }

  return (
    <ApiContext.Provider value={{ getApi: handleGetApi, apis: apiMap }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
