import React, { useRef } from "react";
import "../styles/DataNavegacao.css";
import { FaCalendarDay } from "react-icons/fa";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const formatarData = (data) => {
  if (!(data instanceof Date) || isNaN(data.getTime())) return "Data inválida";
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString();
  const diaSemana = DIAS_SEMANA[data.getDay()];
  return `${dia}/${mes}/${ano}, ${diaSemana}`;
};

const DataNavegacao = ({ dataSelecionada = new Date(), onDataChange }) => {
  const inputRef = useRef(null);

  const navegarDias = (dias) => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + dias);
    onDataChange?.(novaData);
  };

  const abrirCalendario = () => {
    if (typeof inputRef.current?.showPicker === "function") {
      inputRef.current.showPicker();
    } else {
      inputRef.current.click();
    }
  };

  const handleDateChange = (e) => {
    const [ano, mes, dia] = e.target.value.split("-");
    if (!ano || !mes || !dia) return;
    const novaData = new Date(ano, mes - 1, dia);
    if (!isNaN(novaData.getTime())) {
      onDataChange?.(novaData);
    }
  };

  const valorInput = dataSelecionada.toISOString().split("T")[0];

  return (
    <div
      className="data-navegacao-container"
      role="group"
      aria-label="Navegação por data"
    >
      <h3 className="titulo-data">
        <FaCalendarDay aria-hidden="true" focusable="false" />
        <p className="titulo-data">Data</p>
      </h3>

      <div className="data-navegacao-controls">
        <button
          onClick={() => navegarDias(-1)}
          aria-label="Dia anterior"
          type="button"
        >
          &lt;
        </button>

        <div
          className="data-display"
          onClick={abrirCalendario}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && abrirCalendario()
          }
          aria-label={`Data selecionada: ${formatarData(
            dataSelecionada
          )}. Pressione Enter para alterar.`}
        >
          {formatarData(dataSelecionada)}
        </div>

        <button
          onClick={() => navegarDias(1)}
          aria-label="Próximo dia"
          type="button"
        >
          &gt;
        </button>

        <input
          ref={inputRef}
          type="date"
          className="date-input-hidden"
          value={valorInput}
          onChange={handleDateChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

export default DataNavegacao;
