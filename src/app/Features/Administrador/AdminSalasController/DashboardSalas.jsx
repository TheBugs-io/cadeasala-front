import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import CardSalaLayout from "./components/CardSalaLayout";
import "./styles/DashboardSalasStyle.css";
import { fetchSalas } from "../../../service/admin/salasService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../../Components/Snackbar";

const DashboardSalas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const loadSalas = async () => {
      try {
        const data = await fetchSalas();
        const sorted = [...data.salas].sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setSalas(sorted);
      } catch (error) {
        console.error("Erro ao carregar salas:", error);
        setSalas([]);
      } finally {
        setLoading(false);
      }
    };
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
          <button
            className="btn-primary"
            onClick={() => navigate("/admin/dashboard-salas/criar-sala")}
          >
            Criar nova sala
          </button>
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
            <CardSalaLayout
              salas={salas}
              onCardClick={handleSettingsClick}
            />
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
