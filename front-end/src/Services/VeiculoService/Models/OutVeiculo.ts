type OutVeiculo = {
    id: string;
    chassi: string;
    tipoVeiculo: number;
    cor: string;
    placa: string;
    coordenada: {
      latitude: number;
      longitude: number;
    };
  };
  
  export type { OutVeiculo };
  