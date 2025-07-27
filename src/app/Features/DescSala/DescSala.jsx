import { FaRegHeart, FaHeart } from "react-icons/fa";
import TagStatus from "./components/TagStatus";
import "./styles/RoomDetailsPage.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../Components/ui/Snackbar";
import { IoClose } from "react-icons/io5";
import { getImagemPorTipo } from "../../helper/salasHelper";
import { useRoomDetails } from "../../hooks/useRoomDetails";
import ListaReservas from "./components/ReservasSala";
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
    isReservavel
  } = useRoomDetails(dados, onClose);

  let statusFormatado = "";
  switch (dados?.status) {
    case "EM_MANUTENCAO":
      statusFormatado = "Manutenção";
      break;
    case "LIVRE":
      statusFormatado = "Livre";
      break;
    case "RESERVADA":
      statusFormatado = "Reservada";
      break;
    case "PROBLEMA_TECNICO":
      statusFormatado = "Indisponível";
      break;
    case "DISCIPLINA":
      statusFormatado = "Em Aula";
      break;
    case "FUNCIONAL":
      statusFormatado = "Funcional";
      break;
    default:
      statusFormatado = "Funcional";
  }

  return (
    <div
      className="room-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-title"
    >
      <div
        className="room-modal"
        tabIndex="-1"
        ref={modalRef}
        aria-describedby="room-description"
      >
        <header className="room-header">
          <button
            className="room-close-button"
            onClick={onClose}
            aria-label="Fechar detalhes da sala"
          >
            <IoClose />
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
              <TagStatus status={statusFormatado} />
            </div>

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
                <p>
                  <strong>Horário:</strong> {dados.dados.horario}
                </p>
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
            onClick={() => handleReservarSala(dados)}
            aria-label="Agendar uma reserva para esta sala"
            role="button"
            disabled={!isReservavel}
            title={
              !isReservavel
                ? "Não é possível agendar para esta sala no momento"
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
