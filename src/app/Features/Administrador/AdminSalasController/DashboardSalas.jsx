import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import CardSalaLayout from "./components/CardSalaLayout";
import "./styles/DashboardSalasStyle.css";
import { fetchSalas } from "../../../service/admin/salasService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../../Components/ui/Snackbar";
import { IoReloadCircle } from "react-icons/io5";

const DashboardSalas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const loadSalas = async () => {
    setLoading(true);
    try {
      const data = await fetchSalas();
      const sorted = [...data.salas].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      setSalas(sorted);
      setSnackbarMessage("Lista atualizada com sucesso.");
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
      setSalas([]);
      setSnackbarMessage("Erro ao carregar salas.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    loadSalas();
  }, []);

  const handleSettingsClick = (sala) => {
    navigate(`/admin/dashboard-salas/salas/${sala.id}`, {
      state: {
        isEditable: false,
        salaData: sala,
      },
    });
  };

  return (
    <main className="controle-salas" role="main">
      <TrilhaNavegacao
        paths={[{ label: "Página inicial", to: "/admin" }, { label: "Salas" }]}
        aria-label="Navegação"
      />

      <div className="container">
        <div className="header">
          <h1 tabIndex={0}>Salas do bloco IUVI</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/dashboard-salas/criar-sala")}
            >
              Criar nova sala
            </button>
            <button className="btn-secondary" onClick={loadSalas} aria-label="Atualizar lista de salas" role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && loadSalas()}>
              <IoReloadCircle size={18} /> Atualizar lista
            </button>
          </div>
        </div>
        <hr aria-hidden="true" />

        <section className="salas-list" aria-labelledby="lista-de-salas">
          <h2 id="lista-de-salas" className="visually-hidden">
            Lista de salas
          </h2>

          {loading ? (
            <p>Carregando salas...</p>
          ) : salas.length === 0 ? (
            <p>Nenhuma sala encontrada.</p>
          ) : (
            <CardSalaLayout salas={salas} onCardClick={handleSettingsClick} />
          )}
        </section>
      </div>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
      />
    </main>
  );
};

export default DashboardSalas;