import React, { useState } from 'react';
import { adicionarProgramPreDefinido } from "../../services/microondasService";

const aquecimentosPreDefinidos = [
    {
        nome: "Pipoca",
        alimento: "Pipoca (de micro-ondas)",
        tempo: "3:00",
        potencia: 7,
        instrucoes:
            "Observar o barulho de estouros do milho; caso haja um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento.",
    },
    {
        nome: "Leite",
        alimento: "Leite",
        tempo: "5:00",
        potencia: 5,
        instrucoes:
            "Cuidado com aquecimento de líquidos; o choque térmico aliado ao movimento do recipiente pode causar fervura imediata, causando risco de queimaduras.",
    },
    {
        nome: "Carnes de boi",
        alimento: "Carne em pedaço ou fatias",
        tempo: "14:00",
        potencia: 4,
        instrucoes:
            "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para um descongelamento uniforme.",
    },
    {
        nome: "Frango",
        alimento: "Frango (qualquer corte)",
        tempo: "8:00",
        potencia: 7,
        instrucoes:
            "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para um descongelamento uniforme.",
    },
    {
        nome: "Feijão",
        alimento: "Feijão congelado",
        tempo: "8:00",
        potencia: 9,
        instrucoes:
            "Deixe o recipiente destampado; em casos de plástico, cuidado ao retirar o recipiente, pois o mesmo pode perder resistência em altas temperaturas.",
    },
];

const PortaMicroondas = ({ setProgramaSelecionado }) => {
    const [programaAtivo, setProgramaAtivo] = useState(null);
    const [programasDinamicos, setProgramasDinamicos] = useState([]);
    const [novoPrograma, setNovoPrograma] = useState({
        tipo: '',
        alimento: '',
        tempo: '',
        potencia: '',
        caractere: '',
        instrucoes: ''
    });
    const [formularioVisivel, setFormularioVisivel] = useState(false);

    const alternarSelecao = (programa) => {
        if (programaAtivo === programa) {
            setProgramaAtivo(null);
            setProgramaSelecionado(null);
        } else {
            setProgramaAtivo(programa);
            setProgramaSelecionado(programa);
        }
    };

    const adicionarPrograma = async () => {
        const { tipo, alimento, tempo, potencia, caractere, instrucoes } = novoPrograma;
        const response = await adicionarProgramPreDefinido(tipo, alimento, tempo, potencia, caractere, instrucoes);

        if (response && response.preDefinicoes) {
            setProgramasDinamicos((prev) => [...prev, ...response.preDefinicoes]);
        }

        setNovoPrograma({
            tipo: '',
            alimento: '',
            tempo: '',
            potencia: '',
            caractere: '',
            instrucoes: ''
        });

        setFormularioVisivel(false);
    };

    return (
        <div className="porta-microondas">
            <div className="janela">
                {formularioVisivel ? (
                    <div className="formulario-adicionar">
                        <input
                            type="text"
                            value={novoPrograma.tipo}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, tipo: e.target.value })}
                            placeholder="Insira o Nome"
                        />
                        <input
                            type="text"
                            value={novoPrograma.alimento}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, alimento: e.target.value })}
                            placeholder="Insira o Alimento"
                        />
                        <input
                            type="number"
                            value={novoPrograma.tempo}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, tempo: e.target.value })}
                            placeholder="Insira o Tempo"
                        />
                        <input
                            type="number"
                            value={novoPrograma.potencia}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, potencia: e.target.value })}
                            placeholder="Insira a Potência"
                        />
                        <input
                            type="text"
                            value={novoPrograma.caractere}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, caractere: e.target.value })}
                            placeholder="Insira a Representação"
                        />
                        <textarea
                            style={{ height: '150px' }}
                            value={novoPrograma.instrucoes}
                            onChange={(e) => setNovoPrograma({ ...novoPrograma, instrucoes: e.target.value })}
                            placeholder="Insira as Instruções (Opcional)"
                        />
                        <button style={{ backgroundColor: '#45a049', color: 'white' }} onClick={adicionarPrograma}>Adicionar</button>
                        <button style={{ backgroundColor: '#e53935', color: 'white' }} onClick={() => setFormularioVisivel(false)}>Cancelar</button>
                    </div>
                ) : (
                    <div className="aquecimentos-pre-definidos">
                        {[...aquecimentosPreDefinidos, ...programasDinamicos].map((programa, index) => (
                            <button
                                key={index}
                                className={`botao-aquecimento ${programa === programaAtivo ? 'selecionado' : ''}`}
                                onClick={() => alternarSelecao(programa)}
                            >
                                {programa.tipo || programa.nome}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="adicionar-programa">
                <button className="botao-adicionar" onClick={() => setFormularioVisivel(true)}>
                    +
                </button>
            </div>
        </div>
    );
};

export default PortaMicroondas;