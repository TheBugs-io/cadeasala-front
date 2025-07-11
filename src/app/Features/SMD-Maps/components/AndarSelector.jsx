import React, { useState } from 'react';
import '../styles/FloorSelector.css';
import { PiElevatorFill } from "react-icons/pi";

const FloorSelector = () => {
  const [andarSelecionado, setAndarSelecionado] = useState(1);

  return (
    <div className="floor-selector">
      <div className="floor-header" aria-description='Seleção de Andar'>
      <PiElevatorFill className="elevator-icon" size={32} />
      <h1 className="label">Andar</h1>
      </div>
      <div className="options">
        {[1, 2].map((andar) => (
          <button
            key={andar}
            className={`option ${andarSelecionado === andar ? 'active' : ''}`}
            onClick={() => setAndarSelecionado(andar)}
          >
            {andar}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;