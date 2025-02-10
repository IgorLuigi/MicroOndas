namespace MicroOndas_Back.Models
{
	public class Microondas
	{
		public int Tempo { get; set; }
		public int Potencia { get; set; }
		public string Tipo { get; set; }

		public Microondas(int tempo, int potencia, string tipo)
		{
			Tempo = tempo;
            Potencia = potencia;
			Tipo = tipo;
		}
	}
}