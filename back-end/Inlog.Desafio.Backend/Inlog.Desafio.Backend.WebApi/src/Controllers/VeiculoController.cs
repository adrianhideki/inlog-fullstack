using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inlog.Desafio.Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly ILogger<VeiculoController> _logger;
    private readonly IVeiculoService _veiculoService;

    public VeiculoController(ILogger<VeiculoController> logger, IVeiculoService veiculoService)
    {
        _logger = logger;
        _veiculoService = veiculoService;
    }

    [HttpPost("Cadastrar")]
    public async Task<IActionResult> Cadastrar([FromBody] Veiculo dadosDoVeiculo)
    {
        try
        {
            await _veiculoService.CadastrarVeiculo(dadosDoVeiculo);

            return Ok(dadosDoVeiculo.Id);
        }
        catch (Exception err)
        {
            return BadRequest(err.Message);
        }
    }

    [HttpGet("Listar")]
    public async Task<IActionResult> ListarVeiculosAsync()
    {
        var result = await _veiculoService.ListarVeiculos();

        return Ok(result);
    }
}

