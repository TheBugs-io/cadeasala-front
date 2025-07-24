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

//TODO: Criar uma reserva definindo um responsável
export const createReserva = async (reservaData) => {
  try {
    const response = await api.post(`/reservas`, reservaData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    throw error;
  }
};

//TODO: Deletar reserva
export const deleteReserva = async (reservaId) => {
  try {
    const response = await api.delete(`/reservas/${reservaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    throw error;
  }
};
