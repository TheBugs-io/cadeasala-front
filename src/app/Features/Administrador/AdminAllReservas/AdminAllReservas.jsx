import { useEffect, useState } from "react";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import "../AdminAllRequestReserva/styles/ReservasPage.css";
import SkeletonCard from "../../../Components/ui/SkeletonCard";
import { fetchReservas } from "../../../service/admin/reservasService";
import Modal from "../../../Components/ui/Modal";
import DetalhesReserva from "../../DetalhesReserva/DetalhesReserva";

const Card = ({ children, className = "", onClick }) => (
  <div
    className={`card ${className}`}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    {children}
  </div>
);

const formatarData = (dataString) => {
  if (!dataString) return "-";
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR");
};

const AdminAllReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalAberto, setModalAberto] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  useEffect(() => {
    const getReservas = async () => {
      try {
        setLoading(true);
        const data = await fetchReservas();
        setReservas(data || []);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setReservas([]);
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
    (reservation) =>
      reservation.tipo.toUpperCase() !== "DISCIPLINA" &&
      reservation.tipo.toUpperCase() !== "OFICINA"
  );

  const abrirDetalhesReserva = (reserva) => {
    setReservaSelecionada(reserva);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setReservaSelecionada(null);
  };

  const renderSolicitacaoCard = (reservation) => (
    <Card
      key={reservation.id}
      className="reserva-card"
      onClick={() => abrirDetalhesReserva(reservation)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          abrirDetalhesReserva(reservation);
      }}
      aria-label={`Ver detalhes da reserva: ${reservation.local?.nome || "-"}`}
    >
      <div className="reserva-body">
        <h3 className="sala-nome">{reservation.local?.nome || "-"}</h3>
        <p className="horario-info">
          {formatarData(reservation.dataInicio)} - {reservation.horarioInicio}h
          às {reservation.horarioFim}h
        </p>
        <p className="usuario-info">
          <b>Autor:</b> {reservation.responsavel?.nomeCompleto || "-"}
        </p>
      </div>
      <div className="reserva-footer">
        <button
          className={`tipo-button ${reservation.tipo.toLowerCase()}`}
          onClick={(e) => e.stopPropagation()}
        >
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

      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {reservaSelecionada && (
          <DetalhesReserva
            reserva={reservaSelecionada}
            onClose={fecharModal}
            onCancelar={() => cancelarReserva()}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminAllReservas;
