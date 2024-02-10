using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Inlog.Desafio.Backend.Infra.Database;

public class MongoDbClient
{
    private readonly string _database;
    private readonly string _connectionString;
    private readonly MongoClient _client;
    public MongoDbClient(IConfiguration configuration)
    {
        var connection = configuration.GetSection("DB:ConnectionString").Value;
        var database = configuration.GetSection("DB:Database").Value;

        if (String.IsNullOrEmpty(connection))
        {
            throw new ArgumentNullException("DB:ConnectionString", "String de conexão com o banco de dados inválida!");
        }

        if (String.IsNullOrEmpty(database))
        {
            throw new ArgumentNullException("DB:Database", "Nome do banco de dados inválido!");
        }

        _connectionString = connection;
        _database = database;

        _client = new MongoClient(_connectionString);
    }

    public IMongoDatabase GetDatabase()
    {
        return _client.GetDatabase(_database);
    }
}
