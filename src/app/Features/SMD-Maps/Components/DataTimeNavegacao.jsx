import "../styles/DataTimeNavegacao.css";
import { FaClock } from "react-icons/fa";

const horarios = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "20:00 - 22:00",
];

const DataTimeNavegacao = ({ horario, onChangeHorario }) => {
  return (
    <div className="data-time-navegacao" aria-label="Filtragem por horário">
      <label htmlFor="horario-select" className="horario-label" aria-label="Seleção do horário">
        <FaClock size={16} style={{ marginRight: "6px" }} />
        Horário
      </label>
      <select
        id="horario-select"
        value={horario}
        onChange={(e) => onChangeHorario(e.target.value)}
        className="horario-select"
        aria-label="Seleção do horário para filtrar as salas"
        role="combobox"
      >
        <option value="" aria-label="Filtragem com base no horário atual">Horário atual</option>
        {horarios.map((h, i) => (
          <option key={i} value={h} aria-label={`Filtragem com base no horário ${h}`}>
            {h}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataTimeNavegacao;