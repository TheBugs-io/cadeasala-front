import { useEffect, useState } from "react";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import "./styles/ReservasPage.css";
import SkeletonCard from "../../../Components/ui/SkeletonCard";
import { fetchSolicitacoesReservas } from "../../../service/admin/reservasService";
import { useAuth } from "../../../contexts/AuthContext";

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
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const getSolicitacoes = async () => {
      try {
        setLoading(true);
        const response = await fetchSolicitacoesReservas(token);

        if (response.status === "success" && isMounted) {
          setSolicitacoes(response.data || []);
        } else {
          setSolicitacoes([]);
        }
      } catch (error) {
        setSolicitacoes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getSolicitacoes();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const disciplinas = solicitacoes.filter(
    (sol) => sol.tipo?.toUpperCase() === "DISCIPLINA"
  );
  const oficinas = solicitacoes.filter(
    (sol) => sol.tipo?.toUpperCase() === "OFICINA"
  );
  const outras = solicitacoes.filter(
    (sol) =>
      sol.tipo?.toUpperCase() !== "DISCIPLINA" &&
      sol.tipo?.toUpperCase() !== "OFICINA"
  );

  const renderSolicitacaoCard = (sol) => (
    <Card key={sol.id} className="reserva-card">
      <div className="reserva-body">
        <h3 className="sala-nome">{sol.local?.nome || "-"}</h3>
        <p className="horario-info">
          {formatarData(sol.dataInicio)} - {sol.horarioInicio}h às{" "}
          {sol.horarioFim}h
        </p>
        <p className="usuario-info">
          <b>Solicitante:</b> {sol.usuario?.nomeCompleto || "-"} (
          {sol.usuario?.email || "-"})
        </p>
        <p className={`status-info`}>
          <b>Status:</b>{" "}
          <span className={`status-badge ${sol.status?.toLowerCase()}`}>
            {sol.status === "AGUARDANDO" && (
              <>
                <span className="status-icon spinner" aria-hidden="true" />
                <span className="sr-only">Aguardando</span> Aguardando
              </>
            )}
            {sol.status === "APROVADO" && (
              <>
                <span className="status-icon check" aria-hidden="true" />
                <span className="sr-only">Aprovado</span> Aprovado
              </>
            )}
            {sol.status !== "AGUARDANDO" &&
              sol.status !== "APROVADO" &&
              sol.status}
          </span>
        </p>
      </div>
      <div className="reserva-footer">
        <button className={`tipo-button ${sol.tipo?.toLowerCase()}`}>
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
        {loading ? (
          renderSkeletons()
        ) : items.length > 0 ? (
          items.map(renderSolicitacaoCard)
        ) : (
          <p className="sem-reservas-msg">Sem reservas deste tipo</p>
        )}
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
