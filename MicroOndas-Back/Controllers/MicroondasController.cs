using Microsoft.AspNetCore.Mvc;
using MicroOndas_Back.Services;
using MicroOndas_Back.Models;
using MicroOndas_Back.DTOs;

namespace MicroOndas_Back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MicroondasController : ControllerBase
    {
        private readonly IMicroondasService _microondasService;

        public MicroondasController(IMicroondasService microondasService)
        {
            _microondasService = microondasService;
        }

        [HttpPost("aquecer")]
        public IActionResult Aquecer([FromBody] MicroondasRequestDto request)
        {
            var resultado = _microondasService.Aquecer(request.Tempo, request.Potencia, request.Tipo);
            return Ok(resultado);
        }

        [HttpPost("adicionar-aquecimento-pre-definido")]
        public IActionResult CadastrarPreDefinicao([FromBody] PreDefinicaoRequestDto request)
        {
            var resultado = _microondasService.CadastrarPreDefinicao(request.Tempo, request.Potencia, request.Tipo, request.Alimento, request.Caractere, request.Instrucoes);
            var preDefinicoes = _microondasService.CarregarPreDefinicoes();
            return Ok(new { mensagem = resultado, preDefinicoes });
        }
    }
}