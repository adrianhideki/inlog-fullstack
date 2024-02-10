using Inlog.Desafio.Backend.Domain.Models;

namespace Inlog.Desafio.Backend.Domain.Services;

public interface IVeiculoService
{
    Task CadastrarVeiculo(Veiculo veiculo);
    Task<IEnumerable<Veiculo>> ListarVeiculos();
    Task<Veiculo?> BuscarVeiculo(Veiculo veiculo);
}