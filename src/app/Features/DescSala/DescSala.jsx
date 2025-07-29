import { useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import TagStatus from "./components/TagStatus";
import Snackbar from "../../Components/ui/Snackbar";
import ListaReservas from "./components/ReservasSala";
import { getImagemPorTipo } from "../../helper/salasHelper";
import { useRoomDetails } from "../../hooks/useRoomDetails";
import "./styles/RoomDetailsPage.css";

export default function RoomDetails({ dados, onClose }) {
  const {
    reservas,
    favoritado,
    toggleFavorito,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setSnackbarOpen,
    modalRef,
    user,
    reservasDaSala,
    handleReservarSala,
    isReservavel,
  } = useRoomDetails(dados, onClose);

  const getStatusCompleto = () => {
    const agora = new Date();

    const reservaAtiva = dados?.reservas?.find((reserva) => {
      if (reserva.statusPedido !== "APROVADO") return false;

      const inicio = new Date(reserva.dataInicio);
      const fim = new Date(reserva.dataFim);

      return agora >= inicio && agora <= fim;
    });

    if (dados?.status === "FUNCIONAL" && reservaAtiva) {
      return {
        status: "Reservada",
        tipo: "ocupada",
        reservaAtiva,
      };
    }

    switch (dados?.status) {
      case "EM_MANUTENCAO":
        return { status: "Em Manutenção", tipo: "manutencao" };
      case "PROBLEMA_TECNICO":
        return { status: "Indisponível", tipo: "indisponivel" };
      case "FUNCIONAL":
      default:
        return { status: "Livre", tipo: "livre" };
    }
  };

  const { status, tipo, reservaAtiva } = getStatusCompleto();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (modalRef?.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, modalRef]);

  return (
    <div
      className="room-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-title"
      aria-describedby="room-description"
    >
      <div className="room-modal" tabIndex={-1} ref={modalRef}>
        <header className="room-header">
          <button
            className="room-close-button"
            onClick={onClose}
            aria-label="Fechar detalhes da sala"
          >
            <IoClose aria-hidden="true" />
          </button>
        </header>

        <main className="room-content">
          <figure className="room-image-box">
            <div className="room-image-wrapper">
              <img
                src={getImagemPorTipo(dados?.tipo)}
                alt={`Imagem da sala ${dados?.nome || ""}`}
                className="room-image"
              />
              <div className="room-image-overlay" aria-hidden="true" />
            </div>

            <figcaption>
              <button
                className="room-favorite-button"
                aria-label={
                  favoritado
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
                onClick={toggleFavorito}
              >
                {favoritado ? (
                  <FaHeart size={24} color="red" aria-hidden="true" />
                ) : (
                  <FaRegHeart size={24} aria-hidden="true" />
                )}
              </button>
            </figcaption>
          </figure>

          <section className="room-info">
            <h2 id="room-title">{dados?.nome || "SALA"}</h2>
            <p id="room-description">
              {dados?.descricao || "Sem descrição disponível."}
            </p>
            <p>
              <strong>Capacidade:</strong> {dados?.capacidade || "Indefinida"}
            </p>

            <div className="estado-atual">
              <strong>Estado atual:</strong>
              <TagStatus status={status} tipo={tipo} />
            </div>

            {reservaAtiva && (
              <div className="reserva-info">
                <p>
                  <strong>Evento:</strong> {reservaAtiva.nome}
                </p>
                <p>
                  <strong>Horário:</strong> {reservaAtiva.horarioInicio}h às{" "}
                  {reservaAtiva.horarioFim}h
                </p>
                {reservaAtiva.repete && (
                  <p>
                    <strong>Recorrência:</strong>{" "}
                    {reservaAtiva.repeteEm?.join(", ") || "Sem recorrência"}
                  </p>
                )}
              </div>
            )}
            {dados?.dados && (
              <div className="room-extra">
                {dados.dados.disciplina && (
                  <>
                    <p>
                      <strong>Disciplina:</strong> {dados.dados.disciplina}
                    </p>
                    <p>
                      <strong>Professor:</strong> {dados.dados.professor}
                    </p>
                  </>
                )}
                {dados.dados.autor && (
                  <p>
                    <strong>Reservado por:</strong> {dados.dados.autor}
                  </p>
                )}
              </div>
            )}
          </section>
        </main>

        <section className="room-reservations-lista">
          <h3>Agenda da Semana</h3>
          <ListaReservas sala_id={dados?.id} />
        </section>

        <footer className="room-footer">
          <button
            className="btn-agendar"
            onClick={() => {
              if (isReservavel && tipo === "livre") {
                handleReservarSala(dados);
              }
            }}
            aria-label="Agendar uma reserva para esta sala"
            disabled={!isReservavel || tipo !== "livre"}
            title={
              !isReservavel
                ? "Não é possível agendar para esta sala no momento"
                : tipo !== "livre"
                ? "Sala não está disponível para reserva"
                : undefined
            }
          >
            Agendar reserva
          </button>
        </footer>
      </div>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}
