import React, { useState } from 'react';
import '../styles/FloorSelector.css';

const FloorSelector = () => {
  const [andarSelecionado, setAndarSelecionado] = useState(1);

  return (
    <div className="floor-selector">
      <h1 className="label">Andar</h1>
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