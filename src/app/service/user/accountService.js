import api from "../api";

export const listarHistoricoReservas = async (token) => {
  try {
    const response = await api.get("/reservas/minhas-reservas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reservas || [];
  } catch (error) {
    console.error("Erro ao buscar histórico de reservas:", error);
    throw error;
  }
};
