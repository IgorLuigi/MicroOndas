import { useState, useRef } from "react";
import "../../styles/Microondas.css";
import { aquecer } from "../../services/microondasService";
import Botoes from "../Botoes/Botoes";
import Teclado from "../Teclado/Teclado";
import PortaMicroondas from "../Porta/Porta";

export default function Microondas() {
  const [tempo, setTempo] = useState("");
  const [status, setStatus] = useState("");
  const [potencia, setPotencia] = useState("");
  const [campoFocado, setCampoFocado] = useState("tempo");
  const [aquecendo, setAquecendo] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [programaSelecionado, setProgramaSelecionado] = useState(null);

  const gruposRef = useRef([]);
  const indiceRef = useRef(0);
  const exibidoRef = useRef("");
  const intervaloRef = useRef(null);
  const indiceExibicaoRef = useRef(0);

  const converterParaSegundos = (tempoStr) => {
    tempoStr = String(tempoStr); 
    if (tempoStr.includes(":")) {
      const [minutos, segundos] = tempoStr.split(":").map(Number);
      return minutos * 60 + segundos;
    }
    return parseInt(tempoStr, 10) || 0;
  };

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? "0" : ""}${segundosRestantes}`;
  };

  const iniciarIntervalo = () => {
    const resultadoIgual = gruposRef.current.every((item) => item === gruposRef.current[0]);

    if (resultadoIgual) {
      intervaloRef.current = setInterval(() => {
        if (indiceExibicaoRef.current < gruposRef.current.length) {
          exibidoRef.current += ' ' + gruposRef.current[indiceExibicaoRef.current];
          setStatus(exibidoRef.current.trim());
          indiceExibicaoRef.current++;
        } else {
          clearInterval(intervaloRef.current);
          intervaloRef.current = null;
          setStatus("Finalizado!");
          setTimeout(() => {
            setStatus("");
            setTempo("");
            setPotencia("");
            setAquecendo(false);
            setTempoRestante(0);
            gruposRef.current = [];
            indiceRef.current = 0;
            exibidoRef.current = "";
            indiceExibicaoRef.current = 0;
          }, 3000);
        }
      }, 2000);
    } else {
      setStatus(' ' + gruposRef.current.join(' '));
      setTimeout(() => {
        setStatus("Finalizado!");
        setTimeout(() => {
          setStatus("");
          setTempo("");
          setPotencia("");
          setTempoRestante(0);
          setAquecendo(false);
          gruposRef.current = [];
          indiceRef.current = 0;
          exibidoRef.current = "";
          indiceExibicaoRef.current = 0;
        }, 3000);
      }, 2000);
    }
  };

  const iniciar = async () => {
    let tempoEmSegundos = converterParaSegundos(tempo);
    let tempoBase = tempoEmSegundos === 0 ? 30 : tempoEmSegundos;
    let potenciaParaEnviar = potencia === "" ? 10 : parseInt(potencia, 10);

    const tipo = programaSelecionado
      ? (programaSelecionado.tipo || programaSelecionado.nome)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
      : null;

    if (programaSelecionado) {
      tempoBase = converterParaSegundos(programaSelecionado.tempo);
      potenciaParaEnviar = programaSelecionado.potencia;
    }

    if (aquecendo) {
      const novoTotal = tempoRestante + 30;
      setTempoRestante(novoTotal);
      const resultado = await aquecer(novoTotal, potenciaParaEnviar, tipo);
      const novosGrupos = resultado.trim().split(/\s+/);
      gruposRef.current = novosGrupos;
      if (!intervaloRef.current) iniciarIntervalo();
    } else {
      setTempoRestante(tempoBase);
      setAquecendo(true);
      const resultado = await aquecer(tempoBase, potenciaParaEnviar, tipo);
      const grupos = resultado.trim().split(/\s+/);
      gruposRef.current = grupos;

      indiceRef.current = 0;
      exibidoRef.current = exibidoRef.current || "";

      iniciarIntervalo();
    }
  };

  const cancelar = () => {
    if (aquecendo) {
      setStatus("Pausado...");
      setAquecendo(false);
      setTempoRestante(tempoRestante);
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
      exibidoRef.current = status;
    } else {
      setStatus("Cancelado!");
      setTempo("");
      setPotencia("");
      setTempoRestante(0);
      setAquecendo(false);
      setProgramaSelecionado(null);
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }

      gruposRef.current = [];
      indiceRef.current = 0;
      exibidoRef.current = "";
      indiceExibicaoRef.current = 0;
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  const alterarTempo = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setTempo(valor);
  };

  const alterarPotencia = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setPotencia(valor);
  };

  const pressionarTecla = (num) => {
    if (campoFocado === "tempo") {
      setTempo(tempo + num);
    } else if (campoFocado === "potencia") {
      setPotencia(potencia + num);
    }
  };

  return (
    <div className="microondas">
      <PortaMicroondas setProgramaSelecionado={setProgramaSelecionado} />
      <div className="corpo-microondas">
        <div className="tela-microondas">{status}</div>
        <div className="controle-microondas">
          <div className="tempo-e-potencia">
            <div className="item-controle">
              <label htmlFor="tempo">Tempo:</label>
              <input
                type="text"
                id="tempo"
                value={tempo ? formatarTempo(converterParaSegundos(tempo)) : ""}
                onChange={alterarTempo}
                className="entrada-tempo"
                min="0"
                max="999"
                onFocus={() => setCampoFocado("tempo")}
                disabled={programaSelecionado !== null}
              />
            </div>
            <div className="item-controle">
              <label htmlFor="potencia">Potência:</label>
              <input
                type="text"
                id="potencia"
                value={potencia}
                onChange={alterarPotencia}
                className="entrada-potencia"
                onFocus={() => setCampoFocado("potencia")}
                disabled={programaSelecionado !== null}
              />
            </div>
          </div>
          <Teclado pressionarTecla={pressionarTecla} />
          <Botoes iniciar={iniciar} cancelar={cancelar} aquecendo={aquecendo}
            tipo={programaSelecionado ? programaSelecionado.nome : null} />
        </div>
      </div>
    </div>
  );
}
