using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Infra.Database;
using MongoDB.Driver;

namespace Inlog.Desafio.Backend.Domain.Repositories;

public class VeiculoRepository : IVeiculoRepository
{
    private MongoDbClient _client;
    public VeiculoRepository(MongoDbClient client)
    {
        _client = client;
    }

    public async Task CadastrarVeiculo(Veiculo veiculo)
    {
        var database = _client.GetDatabase();
        await database.GetCollection<Veiculo>("veiculo").InsertOneAsync(veiculo);
    }

    public async Task<Veiculo?> BuscarVeiculo(Veiculo veiculo)
    {
        var database = _client.GetDatabase();
        var result = await database.GetCollection<Veiculo>("veiculo").FindAsync((doc) => doc.Id == veiculo.Id);

        return await result.FirstAsync();
    }

    public async Task<IEnumerable<Veiculo>> ListarVeiculos()
    {
        var database = _client.GetDatabase();
        var result = await database.GetCollection<Veiculo>("veiculo").FindAsync((doc) => true);

        return result.ToEnumerable();
    }
}
