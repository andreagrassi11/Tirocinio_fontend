import React, { useState, useEffect } from 'react';

const Cronometro = () => {
  const [tempoTrascorso, setTempoTrascorso] = useState(0);

  useEffect(() => {
    const intervallo = setInterval(() => {
      setTempoTrascorso((prevTempo) => prevTempo + 1);
    }, 1000);

    return () => clearInterval(intervallo);
  }, []);

  return (
    <div>
      <h1 className='textRealtime'>Tempo trascorso: {formatoTempo()}</h1>
    </div>
  );

  function formatoTempo() {
    const ore = Math.floor(tempoTrascorso / 3600);
    const minuti = Math.floor((tempoTrascorso % 3600) / 60);
    const secondi = tempoTrascorso % 60;
    return `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}:${String(secondi).padStart(2, '0')}`;
  }
};

export default Cronometro;