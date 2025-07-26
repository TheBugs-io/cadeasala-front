import api from "../api";

export const favoritarSala = async (salaId) => {
  try {
    const response = await api.post("/users/favoritos", { local_id: salaId }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao favoritar sala:", error);
    throw error;
  }
};

export const listarSalasFavoritas = async () => {
  try {
    const response = await api.get("/users/favoritos", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar salas favoritas:", error);
    throw error;
  }
}

export const deletarFavorito = async (local_id) => {
  try {
    const response = await api.delete("/favoritos", {
      data: { local_id },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar favorito:", error);
    throw error;
  }
};