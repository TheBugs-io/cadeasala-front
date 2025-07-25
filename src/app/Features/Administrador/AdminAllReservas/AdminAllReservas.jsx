import { useEffect, useState } from "react";
import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import "../AdminAllRequestReserva/styles/ReservasPage.css";
import SkeletonCard from "../../../Components/SkeletonCard";
import { fetchReservas, fetchSolicitacoesReservas } from "../../../service/admin/reservasService";

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const formatarData = (dataString) => {
  if (!dataString) return "-";
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR");
};

const AdminAllReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReservas = async () => {
      try {
        setLoading(true);
        const data = await fetchReservas();
        setReservas(data.reservas || []);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    getReservas();
  }, []);

  const disciplinas = reservas.filter(
    (reservation) => reservation.tipo.toUpperCase() === "DISCIPLINA"
  );
  const oficinas = reservas.filter(
    (reservation) => reservation.tipo.toUpperCase() === "OFICINA"
  );
  const outras = reservas.filter(
    (reservation) => reservation.tipo.toUpperCase() !== "DISCIPLINA" && reservation.tipo.toUpperCase() !== "OFICINA"
  );

  const renderSolicitacaoCard = (reservation) => (
    <Card key={reservation.id} className="reserva-card">
      <div className="reserva-body">
        <h3 className="sala-nome">Sala ID: {reservation.localId || "-"}</h3>
        <p className="horario-info">
          {formatarData(reservation.dataInicio)} - {reservation.horarioInicio}h às {reservation.horarioFim}h
        </p>
        <p className="usuario-info">Usuário ID: {reservation.usuarioId || "-"}</p>
        <p className="status-info">Status: {reservation.status}</p>
      </div>
      <div className="reserva-footer">
        <button className={`tipo-button ${reservation.tipo.toLowerCase()}`}>
          {reservation.tipo}
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
          { label: "Todas as reservas" },
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

export default AdminAllReservas;