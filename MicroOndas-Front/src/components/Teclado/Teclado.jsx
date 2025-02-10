import React from 'react';

const Teclado = ({ pressionarTecla }) => {
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="teclado">
      {numeros.map((num) => (
        <button
          key={num}
          onClick={() => pressionarTecla(num)}
          className="botao-teclado"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Teclado;
