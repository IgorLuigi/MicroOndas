using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MicroOndas_Back.Models;
using Newtonsoft.Json;

namespace MicroOndas_Back.Services
{
    public class MicroondasService : IMicroondasService
    {
        private readonly string _filePath = "predefinicoes.json";
        private readonly HashSet<string> _caracteresProibidos = new HashSet<string> { ".", "p", "l", "cb", "fr", "fj" };

        public string Aquecer(int tempo, int potencia, string? tipo)
        {
           
            string erro = ValidarEntrada(tempo, potencia, tipo);
            if (!string.IsNullOrEmpty(erro)) return erro;
            

            return FormatarMensagem(tempo, potencia, tipo);
        }

        private string ValidarEntrada(int tempo, int potencia, string? tipo)
        {
            if (tipo != null)
            {
                return string.Empty;
            }

            if (tempo < 1 || tempo > 120)
                return "Insira um tempo válido! No mínimo 1 segundo e no máximo 2 minutos.";

            if (potencia < 1 || potencia > 10)
                return "Insira uma potência válida! No mínimo nível 1 e no máximo nível 10.";

            return string.Empty;
        }

        private string FormatarMensagem(int tempo, int potencia, string? tipo)
        {
            if (tipo != null)
            {
                string tipoFormatado = tipo switch
                {
                    "pipoca" => "p",
                    "leite" => "l",
                    "carnes de boi" => "cb",
                    "frango" => "fr",
                    "feijao" => "fj",
                    _ => BuscarCaractereNoArquivo(tipo)
                };

                string ponto = string.Concat(Enumerable.Repeat(tipoFormatado, potencia));
                return string.Join(" ", Enumerable.Repeat(ponto, tempo));
            }
            else
            {
                string ponto = new string('.', potencia);
                string resultado = string.Join(" ", Enumerable.Repeat(ponto, tempo));
                return resultado;
            }
        }

        public string CadastrarPreDefinicao(int tempo, int potencia, string tipo, string alimento, string caractere, string? instrucoes)
        {
            if (_caracteresProibidos.Contains(caractere))
            {
                return "O caractere fornecido é proibido!";
            }

            var preDefinicoes = CarregarPreDefinicoes();

            if (preDefinicoes.Any(p => p.Tempo == tempo && p.Potencia == potencia && p.Tipo == tipo && p.Alimento == alimento && p.Caractere == caractere))
            {
                return "Já existe uma predefinição com esses parâmetros!";
            }

            var preDefinicao = new PreDefinicao(tempo, potencia, tipo, alimento, caractere, instrucoes ?? string.Empty);

            preDefinicoes.Add(preDefinicao);

            File.WriteAllText(_filePath, JsonConvert.SerializeObject(preDefinicoes, Formatting.Indented));

            return "Aquecimento predefinido cadastrado com sucesso!";
        }

        public List<PreDefinicao> CarregarPreDefinicoes()
        {
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }

            var json = File.ReadAllText(_filePath);

            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<PreDefinicao>();
            }

            return JsonConvert.DeserializeObject<List<PreDefinicao>>(json) ?? new List<PreDefinicao>();
        }

        private string BuscarCaractereNoArquivo(string tipo)
        {
            var preDefinicoes = CarregarPreDefinicoes();
            var preDefinicao = preDefinicoes.FirstOrDefault(p => p.Tipo.Equals(tipo, StringComparison.OrdinalIgnoreCase));

            if (preDefinicao != null)
            {
                return preDefinicao.Caractere;
            }

            return string.Empty;
        }
    }
}
