import api from "../api";

export const fetchReservasSala = async (salaId) => {
  try {
    const response = await api.get(`/salas/reservas-da-sala`, {
      params: {
        sala_id: salaId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reservas da sala:", error);
    throw error;
  }
};