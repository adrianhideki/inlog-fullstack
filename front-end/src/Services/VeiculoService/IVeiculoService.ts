import { Axios, AxiosResponse } from "axios";
import { OutVeiculo } from "./Models/OutVeiculo";
import { InVeiculo } from "./Models/InVeiculo";

interface IVeiculoService {
  getVeiculos(): Promise<AxiosResponse<OutVeiculo[]>>;
  setVeiculo(data: InVeiculo): Promise<string>;
}

export type { IVeiculoService };
