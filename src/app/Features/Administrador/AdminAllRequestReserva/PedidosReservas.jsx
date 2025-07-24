import { useEffect, useState } from "react";
import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import "./styles/ReservasPage.css";
import SkeletonCard from "../../../Components/SkeletonCard";
import { fetchSolicitacoesReservas } from "../../../service/admin/reservasService";

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const formatarData = (dataString) => {
  if (!dataString) return "-";
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR");
};

const PagePedidosReserva = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSolicitacoes = async () => {
      try {
        setLoading(true);
        const data = await fetchSolicitacoesReservas();
        setSolicitacoes(data.solicitacoes || []);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };

    getSolicitacoes();
  }, []);

  const disciplinas = solicitacoes.filter(
    (sol) => sol.tipo.toUpperCase() === "DISCIPLINA"
  );
  const oficinas = solicitacoes.filter(
    (sol) => sol.tipo.toUpperCase() === "OFICINA"
  );
  const outras = solicitacoes.filter(
    (sol) => sol.tipo.toUpperCase() !== "DISCIPLINA" && sol.tipo.toUpperCase() !== "OFICINA"
  );

  const renderSolicitacaoCard = (sol) => (
    <Card key={sol.id} className="reserva-card">
      <div className="reserva-body">
        <h3 className="sala-nome">Sala ID: {sol.localId || "-"}</h3>
        <p className="horario-info">
          {formatarData(sol.dataInicio)} - {sol.horarioInicio}h às {sol.horarioFim}h
        </p>
        <p className="usuario-info">Usuário ID: {sol.usuarioId || "-"}</p>
        <p className="status-info">Status: {sol.status}</p>
      </div>
      <div className="reserva-footer">
        <button className={`tipo-button ${sol.tipo.toLowerCase()}`}>
          {sol.tipo}
        </button>
      </div>
    </Card>
  );

  const renderSkeletons = (count = 4) => (
    <div className="horizontal-scroll">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  const renderSection = (title, items) => (
    <section className="reservas-section">
      <h2 className="section-title">{title}</h2>
      <div
        className={
          loading || items.length > 2 ? "horizontal-scroll" : "reservas-grid"
        }
      >
        {loading
          ? renderSkeletons()
          : items.length > 0
          ? items.map(renderSolicitacaoCard)
          : <p className="sem-reservas-msg">Sem reservas deste tipo</p>
        }
      </div>
    </section>
  );

  return (
    <div className="reservas-page">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Controle de reservas", to: "/admin/dashboard-reservas" },
          { label: "Pedidos de reserva" },
        ]}
      />

      <div className="reservas-content">
        <div className="reservas-sections">
          {renderSection("Disciplinas", disciplinas)}
          {renderSection("Oficinas", oficinas)}
          {renderSection("Outras reservas", outras)}
        </div>
      </div>
    </div>
  );
};

export default PagePedidosReserva;