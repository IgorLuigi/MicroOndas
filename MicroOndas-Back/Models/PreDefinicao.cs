namespace MicroOndas_Back.Models
{
    public class PreDefinicao : Microondas
    {
        public string Alimento { get; set; }
        public string Caractere { get; set; }
        public string? Instrucoes { get; set; }

        public PreDefinicao(int tempo, int potencia, string tipo, string alimento, string caractere, string? instrucoes)
            : base(tempo, potencia, tipo)
        {
            Alimento = alimento ?? string.Empty;
            Caractere = caractere ?? string.Empty;
            Instrucoes = instrucoes;
        }
    }
}
