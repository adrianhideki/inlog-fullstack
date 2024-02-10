using FluentValidation;
using Inlog.Desafio.Backend.Domain.Models;

namespace Inlog.Desafio.Backend.Domain.Validations;

public class VeiculoValidation : AbstractValidator<Veiculo>
{
    public VeiculoValidation()
    {
        RuleFor(veiculo => veiculo.Placa)
            .NotNull()
            .NotEmpty()
            .MinimumLength(7)
            .WithMessage("Deve ter o tamanho mínimo de 7 caracteres!")
            .MaximumLength(9)
            .WithMessage("Tamanho máximo de 9 caracteres ultrapassado!");

        RuleFor(veiculo => veiculo.Chassi)
            .NotNull()
            .NotEmpty()
            .MinimumLength(10)
            .WithMessage("Deve ter o tamanho mínimo de 10 caracteres!")
            .MaximumLength(20)
            .WithMessage("Tamanho máximo de 20 caracteres ultrapassado!");

        RuleFor(veiculo => veiculo.Coordenada)
            .NotNull()
            .WithMessage("Coordenada não informada!")
            .Must((coordenadas) => coordenadas.Latitude != null)
            .WithMessage("Latitude não informada!")
            .Must((coordenadas) => coordenadas.Longitude != null)
            .WithMessage("Longitude inválida!");

        RuleFor(veiculo => veiculo.TipoVeiculo)
            .NotNull();

        RuleFor(veiculo => veiculo.Cor)
            .NotNull()
            .NotEmpty();
    }
}