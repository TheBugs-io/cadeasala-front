import api from "../api";

export const searchRequisition = async (query) => {
  try {
    const response = await api.get(`/pesquisa/${query}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pesquisar:", error);
    throw error;
  }
}