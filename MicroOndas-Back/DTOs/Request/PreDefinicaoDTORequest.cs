namespace MicroOndas_Back.DTOs
{
    public class PreDefinicaoRequestDto
    {
        public required int Tempo { get; set; }
        public required int Potencia { get; set; }
        public required string Tipo { get; set; }
        public required string Alimento { get; set; }
        public required string Caractere { get; set; }
        public string? Instrucoes { get; set; }
    }
}