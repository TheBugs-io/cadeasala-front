import { PiElevatorFill } from "react-icons/pi";
import '../styles/FloorSelector.css';

const andares = [
  { id: 'PRIMEIRO_ANDAR', label: '1' },
  { id: 'SEGUNDO_ANDAR', label: '2' },
];

const FloorSelector = ({ value, onChange }) => {
  return (
    <div className="floor-selector">
      <div className="floor-header" aria-label="Seleção de Andar">
        <PiElevatorFill className="elevator-icon" size={32} />
        <h1 className="label">Andar</h1>
      </div>
      <div className="options">
        {andares.map((andar) => (
          <button
            key={andar.id}
            className={`option ${value === andar.id ? 'active' : ''}`}
            onClick={() => onChange(andar.id)}
          >
            {andar.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;