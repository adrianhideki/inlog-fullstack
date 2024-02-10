using FluentValidation;
using Inlog.Desafio.Backend.Domain.Models;

namespace Inlog.Desafio.Backend.Domain.Validations;

public class VeiculoValidation : AbstractValidator<Veiculo>
{
    public VeiculoValidation()
    {
        RuleFor(veiculo => veiculo.Placa).NotNull().NotEmpty().MaximumLength(9);
        RuleFor(veiculo => veiculo.Chassi).NotNull().NotEmpty().MaximumLength(10);
        RuleFor(veiculo => veiculo.Coordenadas).NotNull();
        RuleFor(veiculo => veiculo.TipoVeiculo).NotNull();
        RuleFor(veiculo => veiculo.Cor).NotNull().NotEmpty();
    }
}