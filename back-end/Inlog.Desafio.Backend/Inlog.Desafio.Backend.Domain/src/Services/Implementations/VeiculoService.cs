using FluentValidation;
using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.Repositories;
using Inlog.Desafio.Backend.Domain.Validations;

namespace Inlog.Desafio.Backend.Domain.Services;

public class VeiculoService : IVeiculoService
{
    private readonly IVeiculoRepository _repository;

    public VeiculoService(IVeiculoRepository repository)
    {
        _repository = repository;
    }

    public async Task CadastrarVeiculo(Veiculo veiculo)
    {
        var validation = new VeiculoValidation();

        await validation.ValidateAndThrowAsync(veiculo);
        await _repository.CadastrarVeiculo(veiculo);
    }

    public async Task<Veiculo?> BuscarVeiculo(Veiculo veiculo)
    {
        return await _repository.BuscarVeiculo(veiculo);
    }

    public async Task<IEnumerable<Veiculo>> ListarVeiculos()
    {
        return await _repository.ListarVeiculos();
    }
}