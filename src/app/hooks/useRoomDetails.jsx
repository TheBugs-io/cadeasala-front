import { useState, useEffect, useRef } from "react";
import {
  favoritarSala,
  deletarFavorito,
} from "../service/mapa/favoriteService";
import { fetchReservasSala } from "../service/mapa/reservasService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function useRoomDetails(dados, onClose) {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [favoritado, setFavoritado] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const modalRef = useRef(null);
  const { user } = useAuth();

  const isReservavel =
    dados?.status !== "INDISPONIVEL" && dados?.status !== "EM_MANUTENCAO";

  const handleReservarSala = (sala) => {
    if (!user) {
      showSnackbar(
        "Você precisa estar autenticado para agendar uma reserva.",
        "error"
      );
      return;
    }
    navigate(`/user/solicitar-reserva/${sala.id}`);
  };

  useEffect(() => {
    if (dados?.jaFavoritado !== undefined) {
      setFavoritado(dados.jaFavoritado);
    }
  }, [dados]);

  const showSnackbar = (msg, severity = "success") => {
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const toggleFavorito = async () => {
    if (!user) {
      showSnackbar("Você precisa estar autenticado para favoritar.", "error");
      return;
    }

    try {
      if (favoritado) {
        await deletarFavorito(dados.id, user.id);
        setFavoritado(false);
        showSnackbar("Sala removida dos favoritos.");
      } else {
        await favoritarSala(dados.id, user.id);
        setFavoritado(true);
        showSnackbar("Sala favoritada com sucesso!");
      }
    } catch (error) {
      showSnackbar("Erro ao atualizar favorito.", "error");
    }
  };

  useEffect(() => {
    modalRef.current?.focus();
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const reservasDaSala = async () => {
    try {
      const reservas = await fetchReservasSala(dados.id);
    } catch (error) {
      console.error("Erro ao buscar reservas da sala:", error);
    }
  };

  useEffect(() => {
    const carregarReservas = async () => {
      if (dados?.id) {
        try {
          const res = await fetchReservasSala(dados.id);
          setReservas(res);
        } catch (error) {
          console.error("Erro ao buscar reservas da sala:", error);
          showSnackbar("Erro ao carregar reservas da sala.", "error");
        }
      }
    };

    carregarReservas();
  }, [dados?.id]);

  return {
    reservas,
    favoritado,
    toggleFavorito,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setSnackbarOpen,
    modalRef,
    user,
    reservasDaSala,
    handleReservarSala,
    isReservavel,
  };
}
