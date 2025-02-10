namespace MicroOndas_Back.DTOs
{
    public class MicroondasRequestDto
    {
        public required int Tempo { get; set; }
        public required int Potencia { get; set; }
        public string? Tipo { get; set; }
    }
}