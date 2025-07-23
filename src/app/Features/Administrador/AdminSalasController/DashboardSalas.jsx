import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import CardSalaLayout from "./components/CardSalaLayout";
import "./styles/DashboardSalasStyle.css";
import { fetchSalas } from "../../../service/admin/salasService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardSalas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const loadSalas = async () => {
    try {
      const data = await fetchSalas();
      const sorted = [...data.salas].sort((a, b) => a.nome.localeCompare(b.nome));
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
        <h1 tabIndex={0}>Salas do bloco IUVI</h1>
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
            <CardSalaLayout salas={salas} onSettingsClick={handleSettingsClick} />
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardSalas;