namespace MicroOndas_Back.Models.DTOs
{
    public class PreDefinicaoResponseDTO
    {
        public int Tempo { get; set; }
        public int Potencia { get; set; }
        public string Tipo { get; set; }
        public string Alimento { get; set; }
        public string Caractere { get; set; }
        public string? Instrucoes { get; set; }
    }
}