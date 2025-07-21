import { useEffect, useState } from "react";
import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import "./styles/ReservasPage.css";
import SkeletonCard from "../../../Components/SkeletonCard";
import { fetchReservas } from "../../../service/admin/reservasService";

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const PagePedidosReserva = () => {
  const [outrasReservas, setOutrasReservas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getReservas = async () => {
      try {
        setLoading(true);
        const data = await fetchReservas();
        setOutrasReservas(data.outras || []);
        setDisciplinas(data.disciplinas || []);
        setOficinas(data.oficinas || []);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    getReservas();
  }, []);


  const renderReservaCard = (reserva) => {
    const isOficina = reserva.tipo === "Oficina";

    return (
      <Card key={reserva.id} className="reserva-card">
        <div className="reserva-header">
          <div className="reserva-info">
            <p className="professor-info">
              {reserva.professor}
              {reserva.discente && (
                <p className="discente-label">{reserva.discente}</p>
              )}
              {reserva.codigo && (
                <p className="codigo-label">{reserva.codigo}</p>
              )}
              {reserva.local && <p className="local-label">{reserva.local}</p>}
            </p>
          </div>
        </div>

        <div className="reserva-body">
          <h3 className="sala-nome">{reserva.sala}</h3>
          <p className="horario-info">
            {reserva.dia} {reserva.horario}
          </p>
        </div>

        <div className="reserva-footer">
          <button className={`tipo-button ${reserva.tipo.toLowerCase()}`}>
            {reserva.tipo}
          </button>
          {isOficina && (
            <button className="detalhes-button">Ver detalhes</button>
          )}
        </div>
      </Card>
    );
  };

  const renderSkeletons = (count = 4) => (
    <div className="horizontal-scroll">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
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
          {/* Outras Reservas */}
          <section className="reservas-section">
            <h2 className="section-title">Outras reservas</h2>
            <div
              className={
                loading || outrasReservas.length > 2
                  ? "horizontal-scroll"
                  : "reservas-grid"
              }
            >
              {loading ? (
                renderSkeletons()
              ) : outrasReservas.length > 0 ? (
                outrasReservas.map(renderReservaCard)
              ) : (
                <p className="sem-reservas-msg">Sem reservas deste tipo</p>
              )}
            </div>
          </section>

          {/* Disciplinas */}
          <section className="reservas-section">
            <h2 className="section-title">Disciplina</h2>
            <div
              className={
                loading || disciplinas.length > 2
                  ? "horizontal-scroll"
                  : "reservas-grid"
              }
            >
              {loading ? (
                renderSkeletons()
              ) : disciplinas.length > 0 ? (
                disciplinas.map(renderReservaCard)
              ) : (
                <p className="sem-reservas-msg">Sem reservas deste tipo</p>
              )}
            </div>
          </section>

          {/* Oficina */}
          <section className="reservas-section">
            <h2 className="section-title">Oficina</h2>
            <div
              className={
                loading || oficinas.length > 2
                  ? "horizontal-scroll"
                  : "reservas-grid"
              }
            >
              {loading ? (
                renderSkeletons()
              ) : oficinas.length > 0 ? (
                oficinas.map(renderReservaCard)
              ) : (
                <p className="sem-reservas-msg">Sem reservas deste tipo</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PagePedidosReserva;