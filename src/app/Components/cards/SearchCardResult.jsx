import React, { useState, useEffect } from "react";
import {
  favoritarSala,
  deletarFavorito,
} from "../../service/mapa/favoriteService";
import Snackbar from "../ui/Snackbar";
import "./styles/SearchCardResult.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SearchCardResult = ({ tipo, item, onClick }) => {
  const [favorito, setFavorito] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severitySnackbarOpen, setSeveritySnackbarOpen] = useState("info");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSnackbarOpen = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSeveritySnackbarOpen(severity);
    setSnackbarOpen(true);
  };

  const toggleFavorito = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await favoritarSala(item.id);
      setFavorito(!favorito);
      handleSnackbarOpen(
        !favorito
          ? "Sala favoritada com sucesso"
          : "Sala removida dos favoritos",
        "success"
      );
    } catch (error) {
      handleSnackbarOpen("Erro ao favoritar a sala", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const isFavorito = await deletarFavorito(item.id);
        setFavorito(isFavorito);
      } catch (error) {
        console.error("Erro ao verificar favorito:", error);
      }
    };

    checkFavorito();
  }, [item.id]);

  const handleClickCard = () => {
    if (tipo === "sala" && onClick) {
      onClick(item);
    }
  };

  switch (tipo) {
    case "usuario":
      return (
        <>
          <div className="searchcard usuario-card" tabIndex={0}>
            <h2>{item.nomeCompleto}</h2>
            <p>Email: {item.email || "não informado"}</p>
            <span className="tag status-tag">{item.status || "Ativo"}</span>
          </div>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity={severitySnackbarOpen}
          />
        </>
      );

    case "sala":
      return (
        <>
          <div
            className="searchcard sala-card"
            tabIndex={0}
            onClick={handleClickCard}
          >
            <h2>{item.nome}</h2>
            <p>{item.descricao || "Sem descrição"}</p>
            <p>
              <b>Capacidade:</b> {item.capacidade}
            </p>
            <p>
              <b>Estado:</b> {item.status}
            </p>
            <button
              className={`favoritar-btn ${favorito ? "favorito" : ""}`}
              onClick={toggleFavorito}
              aria-pressed={favorito}
              aria-label={favorito ? "Desfavoritar sala" : "Favoritar sala"}
              disabled={loading}
            >
              {favorito ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </button>
          </div>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity={severitySnackbarOpen}
          />
        </>
      );

    case "reserva":
      const reservaTipoClass =
        item.tipo === "DISCIPLINA"
          ? "reserva-disciplina"
          : item.tipo === "OFICINA"
          ? "reserva-oficina"
          : "reserva-outro";

      return (
        <>
          <div className={`searchcard reserva-card`} tabIndex={0}>
            <h2>{item.nome}</h2>
            <p>
              <b>Intervalo:</b> {new Date(item.dataInicio).toLocaleDateString()}{" "}
              a {new Date(item.dataFim).toLocaleDateString()}
            </p>
            <p className={`reserva-tipo ${reservaTipoClass}`}>
              {item.tipo || "Outro"}
            </p>
          </div>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity={severitySnackbarOpen}
          />
        </>
      );

    default:
      return null;
  }
};

export default SearchCardResult;
