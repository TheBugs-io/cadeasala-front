import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/ConfigSala.css";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import { atualizarSala, deleteSala } from "../../../service/admin/salasService";
import Snackbar from "../../../Components/ui/Snackbar";
import { getImagemPorTipo } from "../../../helper/salasHelper";

const ConfigSala = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const estadoInicialEdicao = location.state?.isEditable ?? false;
  const salaInicial = location.state?.salaData;

  const [nome, setNome] = useState("");
  const [image, setImage] = useState(getImagemPorTipo(salaInicial?.tipo || ""));
  const [andar, setAndar] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capacidade, setCapacidade] = useState(0);
  const [status, setStatus] = useState("FUNCIONAL");
  const [isEditable, setIsEditable] = useState(estadoInicialEdicao);

  const handleSalvar = async () => {
    try {
      await atualizarSala(id, {
        nome,
        localizacao: andar,
        descricao,
        capacidade,
      });

      setIsEditable(false);
      setSnackbar({
        open: true,
        message: "Sala atualizada com sucesso.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao atualizar sala. Tente novamente.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (!salaInicial) {
      navigate("/admin/dashboard-salas");
      return;
    }

    setNome(salaInicial.nome);
    setImage(getImagemPorTipo(salaInicial.tipo));
    setAndar(salaInicial.localizacao);
    setDescricao(salaInicial.descricao);
    setCapacidade(salaInicial.capacidade);
    setStatus(
      salaInicial.status === "FUNCIONAL" ? "FUNCIONAL" : salaInicial.status
    );
  }, [salaInicial, navigate]);

  const handleDeleteSala = async () => {
    try {
      await deleteSala(id);
      setShowSnackbar(true);
      setSnackbar({
        open: true,
        message: "Sala deletada com sucesso.",
        severity: "success",
      });
      navigate("/admin/dashboard-salas");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao deletar sala. Tente novamente.",
        severity: "error",
      });
    }
  };

  return (
    <main className="config-sala-container">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Sala" },
          { label: "Detalhes de sala" },
        ]}
      />

      <div className="config-sala-header">
        <h1>Configuração da Sala</h1>
        <div className="config-sala-options">
          {!isEditable && (
            <button
              className="edit-btn"
              onClick={() => setIsEditable(true)}
              aria-label="Ativar modo de edição da sala"
            >
              Editar Sala
            </button>
          )}

          {isEditable && (
            <button
              className="save-btn"
              onClick={handleSalvar}
              aria-label="Salvar alterações da sala"
            >
              Salvar Alterações
            </button>
          )}

          <button className="delete-btn" onClick={() => handleDeleteSala()}>
            Deletar sala
          </button>
        </div>
      </div>

      <div className="config-sala-content">
        <img
          src={image}
          alt={`Imagem ilustrativa da sala ${nome}`}
          className="details-sala-image"
        />

        <div className="config-sala-info">
          <div className="config-sala-title">
            <label htmlFor="nomeSala" className="sr-only">
              Nome da sala
            </label>
            <input
              id="nomeSala"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="title-input"
              readOnly={!isEditable}
              aria-readonly={!isEditable}
              aria-label="Nome da sala"
            />

            <label htmlFor="andarSala" className="sr-only">
              Andar
            </label>
            <select
              id="andarSala"
              value={andar}
              onChange={(e) => setAndar(e.target.value)}
              className="title-input"
              disabled={!isEditable}
              tabIndex={0}
              aria-readonly={!isEditable}
              aria-label="Andar da sala"
            >
              <option value="">Selecione um andar</option>
              <option value="PRIMEIRO_ANDAR">PRIMEIRO ANDAR</option>
              <option value="SEGUNDO_ANDAR">SEGUNDO ANDAR</option>
            </select>
          </div>

          <p>
            <strong>Descrição:</strong>
            <label htmlFor="descricaoSala" className="sr-only">
              Descrição da sala
            </label>
            <textarea
              id="descricaoSala"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="text-area"
              readOnly={!isEditable}
              aria-readonly={!isEditable}
              aria-label="Descrição da sala"
            />
          </p>

          <div>
            <h4>Capacidade:</h4>
            <label htmlFor="capacidadeSala" className="sr-only">
              Capacidade da sala
            </label>
            <input
              id="capacidadeSala"
              type="number"
              value={capacidade}
              onChange={(e) => setCapacidade(Number(e.target.value))}
              className="sub-input"
              readOnly={!isEditable}
              aria-readonly={!isEditable}
              aria-label="Capacidade da sala"
            />
          </div>

          <div>
            <h4>Estado da sala:</h4>
            <label htmlFor="estadoSala" className="sr-only">
              Estado da sala
            </label>
            <select
              id="estadoSala"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!isEditable}
              tabIndex={0}
              aria-readonly={!isEditable}
              className="status-select"
              aria-label="Estado atual da sala"
            >
              <option value="FUNCIONAL">Funcional</option>
              <option value="PROBLEMA_TECNICO">Problema Técnico</option>
              <option value="EM_MANUTENCAO">Em Manutenção</option>
            </select>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </main>
  );
};

export default ConfigSala;
