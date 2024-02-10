import ListarVeiculos from "../Pages/ListarVeiculos";
import CadastrarVeiculos from "../Pages/CadastrarVeiculos";

const routes = [
  {
    path: "/",
    element: <ListarVeiculos />,
  },
  {
    path: "/cadastrar",
    element: <CadastrarVeiculos />,
  },
];

export { routes };
