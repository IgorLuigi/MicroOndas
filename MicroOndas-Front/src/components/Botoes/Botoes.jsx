import React from 'react';

const BotoesControle = ({ iniciar, cancelar, aquecendo, tipo}) => {
  const isDisabled = aquecendo && tipo !== null;
  
  return (
    <div className="botoes-microondas">
      <button onClick={iniciar} className="botao-iniciar" disabled={isDisabled}>
        Iniciar / Início Rápido
      </button>
      <button onClick={cancelar} className="botao-cancelar">
        Pausar / Cancelar
      </button>
    </div>
  );
};

export default BotoesControle;
