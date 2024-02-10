using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.Repositories;
using Inlog.Desafio.Backend.Domain.Services;
using Moq;
using Xunit;
using Xunit.Sdk;

namespace Inlog.Desafio.Backend.Test.Domain;

public class VeiculoServiceTest
{
    private Dictionary<string, Veiculo> _testData = new() {
        {
            "valido",
            new Veiculo() {
                Chassi = "6PFA2r1r8lDG54242",
                Placa = "LRM0387",
                Cor = "Prata",
                Coordenada = new Coordenada()
                {
                    Latitude = -21.9347200,
                    Longitude = -50.5136100
                },
                TipoVeiculo = TipoVeiculo.Onibus
            }
        },
        {
            "chassi invalido",
            new Veiculo() {
                Chassi = "999999999999999999999",
                Placa = "LRM0387",
                Cor = "Prata",
                Coordenada = new Coordenada()
                {
                    Latitude = -21.9347200,
                    Longitude = -50.5136100
                },
                TipoVeiculo = TipoVeiculo.Onibus
            }
        },
        {
            "placa invalida",
            new Veiculo() {
                Chassi = "6PFA2r1r8lDG54242",
                Placa = "99999999",
                Cor = "",
                Coordenada = new Coordenada()
                {
                    Latitude = -21.9347200,
                    Longitude = -50.5136100
                },
                TipoVeiculo = TipoVeiculo.Onibus
            }
        },
        {
            "cor invalida",
            new Veiculo() {
                Chassi = "6PFA2r1r8lDG54242",
                Placa = "LRM0387",
                Cor = "",
                Coordenada = new Coordenada()
                {
                    Latitude = -21.9347200,
                    Longitude = -50.5136100
                },
                TipoVeiculo = TipoVeiculo.Onibus
            }
        },
        {
            "coordenada invalida",
            new Veiculo() {
                Chassi = "6PFA2r1r8lDG54242",
                Placa = "LRM0387",
                Cor = "",
                Coordenada = new Coordenada()
                {
                    Latitude = null,
                    Longitude = -50.5136100
                },
                TipoVeiculo = TipoVeiculo.Onibus
            }
        }
    };

    [Fact]
    public async void Deve_Cadastrar_Veiculos_Corretamente()
    {
        var mockedRepo = new Mock<IVeiculoRepository>();

        var sut = new VeiculoService(mockedRepo.Object);

        var testData = new Veiculo()
        {
            Chassi = "6PFA2r1r8lDG54242",
            Placa = "LRM0387",
            Cor = "Prata",
            Coordenada = new Coordenada()
            {
                Latitude = -21.9347200,
                Longitude = -50.5136100
            },
            TipoVeiculo = TipoVeiculo.Onibus
        };

        var record = await Record.ExceptionAsync(async () =>
        {
            await sut.CadastrarVeiculo(testData);
            mockedRepo.Verify((x) => x.CadastrarVeiculo(testData), Times.Once);
        });

        Assert.Null(record);
    }

    [Theory]
    [InlineData("chassi invalido")]
    [InlineData("placa invalida")]
    [InlineData("cor invalida")]
    [InlineData("coordenada invalida")]
    public async void Falha_Ao_Cadastrar_Veiculos_Invalidos(string chave)
    {
        var mockedRepo = new Mock<IVeiculoRepository>();

        var sut = new VeiculoService(mockedRepo.Object);

        var testData = _testData[chave];

        await Assert.ThrowsAnyAsync<Exception>(async () =>
        {
            await sut.CadastrarVeiculo(testData);
        });
    }
}