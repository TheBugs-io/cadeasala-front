import api from "../api";

export const fetchReservas = async () => {
  try {
    const response = await api.get("/reservas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    throw error;
  }
};

export const fetchSolicitacoesReservas = async () => {
    try {
        const response = await api.get("/reservas/solicitacoes");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar solicitações de reservas:", error);
        throw error;
    }
};