using Inlog.Desafio.Backend.Domain.Repositories;
using Inlog.Desafio.Backend.Domain.Services;
using Inlog.Desafio.Backend.Infra.Database;

namespace Inlog.Desafio.Backend.WebApi.IoC;

public static class VeiculoModule
{
    public static IServiceCollection AddAppDependencies(this IServiceCollection services)
    {
        services.AddSingleton<MongoDbClient>();
        services.AddScoped<IVeiculoRepository, VeiculoRepository>();
        services.AddScoped<IVeiculoService, VeiculoService>();

        return services;        
    }
}