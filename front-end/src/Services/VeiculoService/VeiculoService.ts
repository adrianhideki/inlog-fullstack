import axios, { Axios, AxiosResponse } from "axios";
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
    this._client = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/Veiculo`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      transitional: {
        silentJSONParsing: true,
      },
    });

    this.getVeiculos = this.getVeiculos.bind(this);
    this.setVeiculo = this.setVeiculo.bind(this);
  }

  public getVeiculos(): Promise<AxiosResponse<Array<OutVeiculo>>> {
    var response = this._client.get<Array<OutVeiculo>>("/Listar");

    return response;
  }

  public setVeiculo(data: InVeiculo): Promise<string> {
    var response = this._client.post<InVeiculo, string>("/Cadastrar", data);

    return response;
  }
}

export default VeiculoService.getInstance();
