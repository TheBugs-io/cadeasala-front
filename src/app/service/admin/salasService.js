import api from '../api';

export const fetchSalas = async () => {
  try {
    const response = await api.get(`/salas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    throw error;
  }
}

export const atualizarSala = async (salaId, novosDados) => {
  try {
    const response = await api.put(`/salas/editar`, {
      sala_id: Number(salaId),
      novosDados,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar sala:", error.response?.data || error.message);
    throw error;
  }
};