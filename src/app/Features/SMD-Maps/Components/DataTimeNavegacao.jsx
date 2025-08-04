import { useEffect } from "react";
import "../styles/DataTimeNavegacao.css";
import { FaClock } from "react-icons/fa";
import {
  HORARIOS_DISPONIVEIS,
  useHorarioAtual,
} from "../../../hooks/useHorarioAtual";

const DataTimeNavegacao = ({ horarioSelecionado, onSelecionarHorario }) => {
  const horarioAtual = useHorarioAtual();

  useEffect(() => {
    if (!horarioSelecionado && typeof onSelecionarHorario === "function") {
      onSelecionarHorario(horarioAtual);
    }
  }, [horarioSelecionado, horarioAtual, onSelecionarHorario]);

  return (
    <div className="select-horario">
      <h3 className="titulo-horario">
        <FaClock aria-hidden="true" focusable="false" />
        <p className="titulo-texto">Horário</p>
      </h3>

      <label htmlFor="seletor-horario" className="sr-only">
        Selecionar horário disponível
      </label>
      <select
        id="seletor-horario"
        value={horarioSelecionado || ""}
        onChange={(e) => onSelecionarHorario(e.target.value)}
        aria-label="Selecionar horário disponível"
      >
        <option value="" disabled aria-label="Escolha um horário">
          Escolha um horário
        </option>
        {HORARIOS_DISPONIVEIS.map(({ label }) => (
          <option key={label} value={label} aria-label={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataTimeNavegacao;
