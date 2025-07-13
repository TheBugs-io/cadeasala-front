import { FaRegHeart } from "react-icons/fa";
import TagStatus from "./components/TagStatus";
import "./styles/RoomDetailsPage.css";
import photoSMD from '../../assets/photos/portalUFC.png';

export default function RoomDetails({ sala, status, dados, onClose }) {
  const image =
    dados?.imagem ||
    photoSMD;

  let statusFormatado = "";
  switch (status) {
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
    default:
      statusFormatado = "Status desconhecido";
  }

  return (
    <div className="room-overlay">
      <div className="room-modal">
        <div className="room-header">
          <button className="room-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="room-content">
          <div className="room-image-box">
            <img src={dados?.imagem || photoSMD} alt={dados?.nome || sala} className="room-image" />
            <button className="room-favorite-button"><FaRegHeart /> <b>Favoritar sala</b></button>
          </div>

          <div className="room-info">
            <h2>{dados?.nome || "SALA"}</h2>
            <p>{dados?.descricao || "Sem descrição disponível."}</p>
            <p>
              <strong>Capacidade:</strong> {dados?.capacidade || "Indefinida"}
            </p>

            <div className="estado-atual">
              <strong>Estado atual:</strong>
              <TagStatus status={statusFormatado} />
            </div>
          </div>
        </div>

        {dados?.reservas && dados.reservas.length > 0 && (
          <div className="room-reservations">
            <h3>Próximas reservas</h3>
            {dados.reservas.map((res) => (
              <div
                key={res.id}
                className={
                  res.status === "ativo"
                    ? "room-reservation-active"
                    : "room-reservation-inactive"
                }
              >
                {res.title} - {res.time}
              </div>
            ))}
          </div>
        )}

        <div className="room-footer">
          <button className="room-schedule-button">Agendar reserva</button>
        </div>
      </div>
    </div>
  );
}