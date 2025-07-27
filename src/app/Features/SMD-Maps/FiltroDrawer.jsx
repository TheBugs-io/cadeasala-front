import React, { useEffect, useRef, useState } from 'react';
import './FiltroDrawer.css';

export default function Filtros({ aberto, onFechar, onAplicar }) {
  const [statusSelecionado, setStatusSelecionado] = useState("TODOS");
  const [tipoSelecionado, setTipoSelecionado] = useState("TODOS");

  const tituloRef = useRef(null);

  useEffect(() => {
    if (aberto && tituloRef.current) {
      tituloRef.current.focus(); 
    }
  }, [aberto]);

  const aplicarFiltros = () => {
    onAplicar({ status: statusSelecionado, tipo: tipoSelecionado });
    onFechar();
  };

  return (
    <div 
      className={`painel-filtro ${aberto ? 'ativo' : ''}`} 
      role="dialog"
      aria-labelledby="titulo-filtro"
      aria-modal="true"
    >
      <div className="filtro-conteudo">

        <button 
          className="btn-fechar" 
          onClick={onFechar}
          aria-label="Fechar painel de filtros"
        >
          ×
        </button>

        <h2 
          id="titulo-filtro" 
          ref={tituloRef} 
          tabIndex="-1"
        
        >
          Filtrar por
        </h2>

        <h3>Status da sala</h3>
        <div className="botoes">
          <button
            className={statusSelecionado === "LIVRE" ? "selecionado" : ""}
            onClick={() => setStatusSelecionado("LIVRE")}
            aria-pressed={statusSelecionado === "LIVRE"}
            aria-label="Filtrar por salas livres"
          >
            Livre
          </button>
          <button
            className={statusSelecionado === "RESERVADA" ? "selecionado" : ""}
            onClick={() => setStatusSelecionado("RESERVADA")}
            aria-pressed={statusSelecionado === "RESERVADA"}
            aria-label="Filtrar por salas reservadas"
          >
            Reservada
          </button>
          <button
            className={statusSelecionado === "TODOS" ? "selecionado" : ""}
            onClick={() => setStatusSelecionado("TODOS")}
            aria-pressed={statusSelecionado === "TODOS"}
            aria-label="Filtrar todas as salas"
          >
            Todos
          </button>
        </div>

        <h3>Tipo de reserva</h3>
        <div className="botoes">
          <button
            className={tipoSelecionado === "DISCIPLINA" ? "selecionado" : ""}
            onClick={() => setTipoSelecionado("DISCIPLINA")}
            aria-pressed={tipoSelecionado === "DISCIPLINA"}
            aria-label="Filtrar por disciplina"
          >
            Disciplina
          </button>
          <button
            className={tipoSelecionado === "OFICINA" ? "selecionado" : ""}
            onClick={() => setTipoSelecionado("OFICINA")}
            aria-pressed={tipoSelecionado === "OFICINA"}
            aria-label="Filtrar por oficina"
          >
            Oficina
          </button>
          <button
            className={tipoSelecionado === "OUTRO" ? "selecionado" : ""}
            onClick={() => setTipoSelecionado("OUTRO")}
            aria-pressed={tipoSelecionado === "OUTRO"}
            aria-label="Filtrar por outro"
          >
            Outro
          </button>
        </div>

        <button 
          className="btn-aplicar" 
          onClick={aplicarFiltros}
          aria-label="Aplicar filtros selecionados"
        >
          Aplicar
        </button>

      </div>
    </div>
  );
}