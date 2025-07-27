import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Components/ui/Modal";
import "./FiltroDrawer.css";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

export default function Filtros({ aberto, onFechar, onAplicar }) {
  const isMobile = useIsMobile();

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

  const conteudoFiltros = (
    <div
      className={`painel-filtro${isMobile ? "" : aberto ? " ativo" : ""}`}
      role="dialog"
      aria-labelledby="titulo-filtro"
      aria-modal="true"
      style={
        isMobile
          ? {
              position: "static",
              width: "auto",
              height: "auto",
              boxShadow: "none",
            }
          : {}
      }
    >
      <div className="filtro-conteudo">
        {!isMobile && (
          <button
            className="btn-fechar"
            onClick={onFechar}
            aria-label="Fechar painel de filtros"
          >
            ×
          </button>
        )}

        <h2 id="titulo-filtro" ref={tituloRef} tabIndex="-1">
          Filtrar por
        </h2>

        <h3 id="status-label">Status da sala</h3>
        <div
          className="botoes"
          role="radiogroup"
          aria-labelledby="status-label"
        >
          {["FUNCIONAL", "RESERVADA", "TODOS"].map((status) => (
            <button
              key={status}
              role="radio"
              aria-checked={statusSelecionado === status}
              tabIndex={statusSelecionado === status ? 0 : -1}
              className={statusSelecionado === status ? "selecionado" : ""}
              onClick={() => setStatusSelecionado(status)}
            >
              {status === "FUNCIONAL"
                ? "Funcional"
                : status === "RESERVADA"
                ? "Reservada"
                : "Todos"}
            </button>
          ))}
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
          <button
            className={tipoSelecionado === "TODOS" ? "selecionado" : ""}
            onClick={() => setTipoSelecionado("TODOS")}
            aria-pressed={tipoSelecionado === "TODOS"}
            aria-label="Filtrar todos os tipos"
          >
            Todos
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

  if (isMobile) {
    return (
      <Modal isOpen={aberto} onClose={onFechar}>
        {conteudoFiltros}
      </Modal>
    );
  }

  return conteudoFiltros;
}
