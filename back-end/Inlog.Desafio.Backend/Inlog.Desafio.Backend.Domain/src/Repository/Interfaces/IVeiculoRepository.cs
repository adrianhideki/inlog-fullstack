using Inlog.Desafio.Backend.Domain.Models;

namespace Inlog.Desafio.Backend.Domain.Repositories;

public interface IVeiculoRepository
{
    Task CadastrarVeiculo(Veiculo veiculo);
    Task<IEnumerable<Veiculo>> ListarVeiculos();
    Task<Veiculo?> BuscarVeiculo(Veiculo veiculo);
}
