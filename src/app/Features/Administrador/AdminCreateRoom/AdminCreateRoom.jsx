import { useState, useRef, useEffect } from "react";
import "./styles/CreateRoomStyle.css";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import Snackbar from "../../../Components/ui/Snackbar";
import { createSala } from "../../../service/admin/salasService";
import { useNavigate } from "react-router-dom";
import { TipoSala, TipoSalaLabels } from "./helper/tipoSalas";

const CreateSalas = () => {
  const navigate = useNavigate();
  const mainHeadingRef = useRef(null);

  const [roomData, setRoomData] = useState({
    roomName: "",
    roomDescription: "",
    roomType: "",
    roomLocation: "",
    roomNumber: "",
    roomCapacity: 1,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    mainHeadingRef.current?.focus();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: name === "roomCapacity" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!roomData.roomName.trim())
      newErrors.roomName = "Nome da sala é obrigatório.";
    if (!roomData.roomType) newErrors.roomType = "Tipo de sala é obrigatório.";
    if (!roomData.roomLocation)
      newErrors.roomLocation = "Localização é obrigatória.";
    if (!roomData.roomNumber.trim())
      newErrors.roomNumber = "Numeração da sala é obrigatória.";
    if (!roomData.roomCapacity || roomData.roomCapacity < 1)
      newErrors.roomCapacity = "Capacidade mínima é 1.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = {
          nome: roomData.roomName.trim(),
          descricao: roomData.roomDescription.trim(),
          tipo: roomData.roomType,
          localizacao: roomData.roomLocation,
          numeracaoSala: roomData.roomNumber.trim(),
          capacidade: roomData.roomCapacity,
        };

        await createSala(payload);

        showSnackbar("Sala criada com sucesso!");

        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } catch (error) {
        console.error(error);
        showSnackbar("Erro ao criar sala.");
      }
    }
  };

  return (
    <div className="admin-create-room">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Salas", to: "/admin/dashboard-salas" },
          { label: "Criar uma sala" },
        ]}
        aria-label="Navegação principal"
      />
      <h1 ref={mainHeadingRef} tabIndex={-1}>
        Criação de sala
      </h1>
      <p>Preencha os detalhes da nova sala abaixo:</p>
      <hr aria-hidden="true" />
      <div className="header">
        <h2 tabIndex={0}>Detalhes da Sala</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        aria-describedby="formErrors"
        className="forms-create-room"
      >
        <label htmlFor="roomName">
          Nome da Sala: <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="roomName"
          name="roomName"
          value={roomData.roomName}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.roomName ? "true" : "false"}
          aria-describedby={errors.roomName ? "roomName-error" : undefined}
        />
        {errors.roomName && (
          <span className="error-message" role="alert" id="roomName-error">
            {errors.roomName}
          </span>
        )}

        <label htmlFor="roomDescription">Descrição:</label>
        <textarea
          id="roomDescription"
          name="roomDescription"
          value={roomData.roomDescription}
          onChange={handleChange}
          aria-required="false"
        />

        <label htmlFor="roomType">
          Tipo de Sala: <span aria-hidden="true">*</span>
        </label>
        <select
          id="roomType"
          name="roomType"
          value={roomData.roomType}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.roomType ? "true" : "false"}
          aria-describedby={errors.roomType ? "roomType-error" : undefined}
        >
          <option value="" disabled>
            Selecione um tipo
          </option>
          {Object.entries(TipoSala).map(([key, value]) => (
            <option key={value} value={value}>
              {TipoSalaLabels[value] || value}
            </option>
          ))}
        </select>
        {errors.roomType && (
          <span className="error-message" role="alert" id="roomType-error">
            {errors.roomType}
          </span>
        )}

        <label htmlFor="roomLocation">
          Localização: <span aria-hidden="true">*</span>
        </label>
        <select
          id="roomLocation"
          name="roomLocation"
          value={roomData.roomLocation}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.roomLocation ? "true" : "false"}
          aria-describedby={
            errors.roomLocation ? "roomLocation-error" : undefined
          }
        >
          <option value="" disabled>
            Selecione uma localização
          </option>
          <option value="PRIMEIRO_ANDAR">Primeiro andar</option>
          <option value="SEGUNDO_ANDAR">Segundo andar</option>
        </select>
        {errors.roomLocation && (
          <span className="error-message" role="alert" id="roomLocation-error">
            {errors.roomLocation}
          </span>
        )}

        <label htmlFor="roomNumber">
          Numeração da Sala: <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          placeholder="Exemplo: Se for a primeira sala a direita, escreva um número e o lado como '1D'"
          value={roomData.roomNumber}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.roomNumber ? "true" : "false"}
          aria-describedby={errors.roomNumber ? "roomNumber-error" : undefined}
        />
        {errors.roomNumber && (
          <span className="error-message" role="alert" id="roomNumber-error">
            {errors.roomNumber}
          </span>
        )}

        <label htmlFor="roomCapacity">Capacidade:</label>
        <input
          type="number"
          id="roomCapacity"
          name="roomCapacity"
          min="1"
          max="100"
          value={roomData.roomCapacity}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.roomCapacity ? "true" : "false"}
          aria-describedby={
            errors.roomCapacity ? "roomCapacity-error" : undefined
          }
        />
        {errors.roomCapacity && (
          <span className="error-message" role="alert" id="roomCapacity-error">
            {errors.roomCapacity}
          </span>
        )}

        <button type="submit" aria-label="Criar Sala">
          Criar Sala
        </button>
      </form>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default CreateSalas;
