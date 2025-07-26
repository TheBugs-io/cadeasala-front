import { useState, useEffect, useRef } from "react";
import { favoritarSala, deletarFavorito } from "../service/mapa/favoriteService";
import { useAuth } from "../contexts/AuthContext";

export function useRoomDetails(dados, onClose) {
  const [favoritado, setFavoritado] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const modalRef = useRef(null);
  const { user } = useAuth();

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

  return {
    favoritado,
    toggleFavorito,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setSnackbarOpen,
    modalRef,
    user,
  };
}