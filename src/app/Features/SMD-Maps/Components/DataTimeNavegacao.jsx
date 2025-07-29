import React, { useEffect } from 'react';
import '../styles/DataTimeNavegacao.css';

const BLOCOS_HORARIOS = [
  { label: "08h-10h", inicio: 8, fim: 10 },
  { label: "10h-12h", inicio: 10, fim: 12 },
  { label: "14h-16h", inicio: 14, fim: 16 },
  { label: "16h-18h", inicio: 16, fim: 18 },
  { label: "18h-20h", inicio: 18, fim: 20 },
  { label: "20h-22h", inicio: 20, fim: 22 }
];

const DataTimeNavegacao = ({ horarioSelecionado, onSelecionarHorario }) => {
  useEffect(() => {
    if (!horarioSelecionado && typeof onSelecionarHorario === 'function') {
      const horaAtual = new Date().getHours();
      const blocoAtual = BLOCOS_HORARIOS.find(
        ({ inicio, fim }) => horaAtual >= inicio && horaAtual < fim
      );
      if (blocoAtual) {
        onSelecionarHorario(blocoAtual.label);
      }
    }
  }, []);

  return (
    <div
      className="blocos-horarios"
      role="group"
      aria-label="Selecionar horário disponível"
    >
      {BLOCOS_HORARIOS.map(({ label, inicio }) => (
        <button
          key={inicio}
          type="button"
          className={`bloco-horario ${horarioSelecionado === label ? 'selecionado' : ''}`}
          onClick={() => onSelecionarHorario(label)}
          aria-pressed={horarioSelecionado === label}
          aria-label={`Horário ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DataTimeNavegacao;