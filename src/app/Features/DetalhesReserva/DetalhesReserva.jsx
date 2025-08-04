import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./styles/DetalhesReserva.css";
import skatistaAlt from "../../assets/illustrations/altSkatista.svg";
import ModalConfirmAction from "../../Components/ui/ModalConfirmAction";
import Snackbar from "../../Components/ui/Snackbar";
import { deleteReserva } from "../../service/admin/reservasService";

export default function DetalhesReserva({
  reserva,
  onClose,
  onAtualizarReservas,
}) {
  const { user } = useAuth();
  const image =
    skatistaAlt ||
    "https://raw.githubusercontent.com/TheBugs-io/cadeasala-front/612b99a4a0327208f6a664a43e23e661152df108/src/app/assets/illustrations/altSkatista.svg";
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    tipo,
    dataPedido,
    responsavel = {},
    dataInicio,
    dataFim,
    horarioInicio,
    horarioFim,
  } = reserva;

  const { nomeCompleto, email, tipo: tipoUsuario } = responsavel;

  const abrirModalConfirm = () => setModalConfirmOpen(true);
  const fecharModalConfirm = () => setModalConfirmOpen(false);

  const confirmarCancelamento = async () => {
    try {
      await deleteReserva(reserva.id, user.token);
      setSnackbarSeverity("success");
      setSnackbarMessage("Reserva cancelada com sucesso!");
      setSnackbarOpen(true);
      fecharModalConfirm();
      onClose();
      if (onAtualizarReservas) {
        await onAtualizarReservas();
      }
    } catch (error) {
      console.error("Erro ao cancelar a reserva:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Erro ao cancelar a reserva.");
      setSnackbarOpen(true);
    }
  };

  return (
    <section
      className="detalhes-reserva"
      aria-labelledby="titulo-detalhes"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <h2 id="titulo-detalhes" tabIndex={0}>
        Detalhes da reserva
      </h2>

      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="detalhes-imagem"
        tabIndex={-1}
      />

      <dl className="reserva-info">
        <div className="detalhes-reserva-autor">
          <div className="detalhe-item">
            <dt>
              <b>Solicitante:</b>
            </dt>
            <dd>{nomeCompleto || "Desconhecido"}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Email:</b>
            </dt>
            <dd>{email || "Desconhecido"}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Tipo de usuário:</b>
            </dt>
            <dd>{tipoUsuario || "Desconhecido"}</dd>
          </div>
        </div>

        <div className="detalhes-pedido">
          <div className="detalhe-item">
            <dt>
              <b>Tipo de solicitação:</b>
            </dt>
            <dd>{tipo}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Data da reserva:</b>
            </dt>
            <dd>
              {new Date(dataInicio).toLocaleDateString()} às{" "}
              {new Date(dataFim).toLocaleDateString()}
            </dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Horário da reserva:</b>
            </dt>
            <dd>
              {horarioInicio}h às {horarioFim}h
            </dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Pedido feito em:</b>
            </dt>
            <dd>
              {new Date(dataPedido).toLocaleDateString()} às{" "}
              {new Date(dataPedido).toLocaleTimeString()}
            </dd>
          </div>
        </div>
      </dl>

      <div className="acoes-reserva">
        <button
          className="btn-cancelar"
          onClick={abrirModalConfirm}
          aria-label="Cancelar reserva"
          role="button"
        >
          Cancelar reserva
        </button>
      </div>

      <ModalConfirmAction
        isOpen={modalConfirmOpen}
        onClose={fecharModalConfirm}
        onConfirm={confirmarCancelamento}
        mensagem="Tem certeza que deseja cancelar esta reserva?"
      />

      <Snackbar
        isOpen={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </section>
  );
}
