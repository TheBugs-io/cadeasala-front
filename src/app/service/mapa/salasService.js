import api from "../api";

export const getSalaPorId = async (id) => {
  try {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sala:", error);
    throw error;
  }
}

export const solicitacaoReserva = async (localId, formData) => {
  try {
    const payload = {
      localId,
      tipo: formData.reservationType,
      dataInicio: formData.startDate,
      dataFim: formData.endDate,
      usuarioId: formData.usuarioId,
    };

    const response = await api.post(`/reservas/solicitar-reserva`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar reserva:", error);
    throw error;
  }
};
