import { FaRegHeart } from "react-icons/fa";
import TagStatus from "./components/TagStatus";
import "./styles/RoomDetailsPage.css";
import photoSMD from "../../assets/photos/portalUFC.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
//TODO: Passar snackbar aqui

export default function RoomDetails({ dados, onClose }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { user } = useAuth();
  const image = dados?.imagem || photoSMD;
  const navigate = useNavigate();

  const handleReservarSala = (sala) => {
    if (!user) {
      setSnackbarMessage(
        "Você precisa estar autenticado para solicitar uma reserva."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    navigate(`/solicitar-reserva/${sala.id}`);
  };

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
            <img src={image} alt={dados?.sala} className="room-image" />
            <button className="room-favorite-button">
              <FaRegHeart /> <b>Favoritar sala</b>
            </button>
          </div>

          <div className="room-info">
            <h2>{dados?.sala || "SALA"}</h2>
            <p>{dados?.descricao || "Sem descrição disponível."}</p>
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
          </div>
        </div>

        {dados?.reservas?.length > 0 && (
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
          <button
            className="room-schedule-button"
            onClick={() => handleReservarSala(dados)}
          >
            Agendar reserva
          </button>
        </div>
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
