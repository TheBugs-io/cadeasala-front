import React, { useRef } from "react";
import "./DataNavegacao.css";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = String(data.getFullYear()).slice(-2);
  const diaSemana = diasSemana[data.getDay()];
  return `${dia}/${mes}/${ano}, ${diaSemana}`;
}

const DataNavegacao = ({ dataSelecionada, onDataChange }) => {
  const inputRef = useRef(null);

  const alterarData = (dias) => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + dias);
    onDataChange(novaData);
  };

  const abrirCalendario = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.(); 
      inputRef.current.click(); 
    }
  };

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirCalendario();
    }
  };

  
  const valorInput = `${dataSelecionada.getFullYear()}-${String(
    dataSelecionada.getMonth() + 1
  ).padStart(2, "0")}-${String(dataSelecionada.getDate()).padStart(2, "0")}`;

  return (
    <div className="data-navegacao-container">
      <button
        onClick={() => alterarData(-1)}
        aria-label="Selecionar dia anterior"
      >
        &lt;
      </button>

      <div
        className="data-label"
        onClick={abrirCalendario}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Selecionar data. Data atual: ${formatarData(dataSelecionada)}`}
      >
        {formatarData(dataSelecionada)}
      </div>

      <button onClick={() => alterarData(1)} aria-label="Selecionar dia seguinte">
        &gt;
      </button>

      <input
        ref={inputRef}
        type="date"
        className="input-invisivel"
        value={valorInput}
        onChange={(e) => {
  const [ano, mes, dia] = e.target.value.split("-");
  if (ano && mes && dia) {
    const novaData = new Date(ano, mes - 1, dia);
    if (!isNaN(novaData.getTime())) {
      onDataChange(novaData);
    } else {
      
      onDataChange(new Date());
    }
  }
}}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default DataNavegacao;