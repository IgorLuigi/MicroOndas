using MicroOndas_Back.Models;

namespace MicroOndas_Back.Services
{
    public interface IMicroondasService
    {
        string Aquecer(int tempo, int potencia, string? tipo);
        string CadastrarPreDefinicao(int tempo, int potencia, string tipo, string alimento, string caractere, string instrucoes);
        List<PreDefinicao> CarregarPreDefinicoes();
    }
}