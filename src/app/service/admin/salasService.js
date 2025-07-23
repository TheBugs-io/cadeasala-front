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