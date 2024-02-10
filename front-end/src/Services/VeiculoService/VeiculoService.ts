import { Axios, AxiosResponse } from "axios";
import { OutVeiculo } from "./Models/OutVeiculo";
import { InVeiculo } from "./Models/InVeiculo";
import { IVeiculoService } from "./IVeiculoService";

class VeiculoService implements IVeiculoService {
  private static _instance: VeiculoService;
  private _client: Axios;

  public static getInstance(): VeiculoService {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this._client = new Axios({
      baseURL: `${process.env.REACT_APP_API_URL}/Veiculo`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
        "Content-Type": "application/json",
      },
    });

    this.getVeiculos = this.getVeiculos.bind(this);
    this.setVeiculo = this.setVeiculo.bind(this);
  }

  public getVeiculos(): Promise<AxiosResponse<OutVeiculo[]>> {
    var response = this._client.get<OutVeiculo[]>("/Listar");

    return response;
  }

  public setVeiculo(data: InVeiculo): Promise<string> {
    var response = this._client.post<InVeiculo, string>("/Cadastrar", data);

    return response;
  }
}

export default VeiculoService.getInstance();
