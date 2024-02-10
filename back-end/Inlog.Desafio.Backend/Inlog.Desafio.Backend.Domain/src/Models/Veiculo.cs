namespace Inlog.Desafio.Backend.Domain.Models;

public class Veiculo
{
    public string Chassi { get; set; } = "";
    public TipoVeiculo TipoVeiculo { get; set; }
    public string Cor { get; set; } = "";
    public string Placa { get; set; } = "";
    public double[] Coordenadas { get; set; } = Array.Empty<double>();
    public string Id { get; set; } = Guid.NewGuid().ToString();
}
