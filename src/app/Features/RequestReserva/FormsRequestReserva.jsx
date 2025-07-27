import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/FormsRequestStyle.css";
import { getSalaPorId } from "../../service/mapa/salasService";
import { createReserva } from "../../service/admin/reservasService";
import { useAuth } from "../../contexts/AuthContext";
import Snackbar from "../../Components/ui/Snackbar";
import { IoMdCalendar } from "react-icons/io";

export default function ReservaForm() {
  const { idSala } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    startTime: "10",
    endTime: "12",
    startDate: "",
    endDate: "",
    repeatWeekly: false,
    selectedDays: [],
    reservationType: "",
    reason: "",
  });

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  const [salaInfo, setSalaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSala() {
      try {
        const data = await getSalaPorId(idSala);
        setSalaInfo(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar sala.");
      } finally {
        setLoading(false);
      }
    }

    fetchSala();
  }, [idSala]);

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const weekDays = [
    { key: "DOM", label: "D" },
    { key: "SEG", label: "S" },
    { key: "TER", label: "T" },
    { key: "QUA", label: "Q" },
    { key: "QUI", label: "Q" },
    { key: "SEX", label: "S" },
    { key: "SAB", label: "S" },
  ];

  const solicitacaoReserva = async (reservaData) => {
    try {
      const response = await createReserva(reservaData, user?.token);
      return response;
    } catch (error) {
      console.error("Erro ao solicitar reserva:", error);
      throw error;
    }
  };

  const showSnackbar = (message, type = "success") => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user?.tipo === "DISCENTE" &&
      formData.reservationType === "disciplina"
    ) {
      alert("Discentes não podem fazer reservas do tipo 'disciplina'.");
      return;
    }

    const payload = {
      tipo: formData.reservationType.toUpperCase(),
      localId: salaInfo.id,
      dataInicio: new Date(formData.startDate),
      dataFim: new Date(formData.endDate),
      horarioInicio: parseInt(formData.startTime, 10),
      horarioFim: parseInt(formData.endTime, 10),
      repeteEm: formData.selectedDays,
      usuarioId: user?.id,
    };

    try {
      await solicitacaoReserva(payload);
      showSnackbar("Solicitação enviada!", "success");

      setTimeout(() => {
        navigate("/mapa-salas");
      }, 6000);
    } catch (error) {
      showSnackbar("Erro ao solicitar reserva.", "error");
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <header className="reservation-form__header">
        <h1 className="reservation-form__title">Reserva</h1>
        <p className="reservation-form__subtitle">Sala que está reservando</p>

        {loading ? (
          <div className="reservation-form__room">Carregando sala...</div>
        ) : error ? (
          <div className="reservation-form__room error">Erro: {error}</div>
        ) : (
          <div className="reservation-form__room">
            {salaInfo?.nome?.toUpperCase()} - Andar {salaInfo?.andar}
          </div>
        )}

        <h2 className="reservation-form__label">Responsável pela reserva</h2>
        <p className="reservation-form__responsible">
          {user?.nome || "Usuário não autenticado"}
        </p>
      </header>

      <section className="reservation-form__section">
        <h2 className="reservation-form__section-title">Detalhes</h2>

        <fieldset className="reservation-form__fieldset">
          <legend className="reservation-form__legend">
            Horário da Reserva
          </legend>
          <div className="reservation-form__time-group">
            <label htmlFor="start-time">Início:</label>
            <select
              id="start-time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startTime: e.target.value }))
              }
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={i}>
                  {i} horas
                </option>
              ))}
            </select>

            <label htmlFor="end-time">Fim:</label>
            <select
              id="end-time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endTime: e.target.value }))
              }
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={i}>
                  {i} horas
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="reservation-form__fieldset">
          <legend className="reservation-form__legend">
            Período da Reserva
          </legend>
          <div className="reservation-form__date-group">
            <label htmlFor="start-date" className="clickable-date-label">
              <IoMdCalendar size={20} />
              Data de início
              <input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="clickable-date-input"
              />
            </label>

            <label htmlFor="end-date" className="clickable-date-label">
              <IoMdCalendar size={20} />
              Data de fim
              <input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="clickable-date-input"
              />
            </label>
          </div>
        </fieldset>

        <div className="reservation-form__repeat">
          <input
            id="repeat-weekly"
            type="checkbox"
            checked={formData.repeatWeekly}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                repeatWeekly: e.target.checked,
              }))
            }
          />
          <label htmlFor="repeat-weekly">Repetir dias da semana</label>
        </div>

        {formData.repeatWeekly && (
          <div
            className="reservation-form__weekdays"
            role="group"
            aria-label="Dias da semana"
          >
            {weekDays.map((day) => (
              <button
                key={day.key}
                type="button"
                className={`reservation-form__weekday-btn ${
                  formData.selectedDays.includes(day.key) ? "selected" : ""
                }`}
                aria-pressed={formData.selectedDays.includes(day.key)}
                onClick={() => handleDayToggle(day.key)}
              >
                {day.label}
              </button>
            ))}
          </div>
        )}

        <fieldset className="reservation-form__fieldset">
          <legend className="reservation-form__legend">Tipo de reserva</legend>
          <div className="reservation-form__radio-group">
            {["oficina", "disciplina", "outro"].map((type) => {
              const isDiscente = user?.tipo === "DISCENTE";
              const isDisciplina = type === "disciplina";
              const disabled = isDiscente && isDisciplina;

              return (
                <div key={type} className="reservation-form__radio-option">
                  <input
                    id={`reservation-${type}`}
                    type="radio"
                    name="reservationType"
                    value={type}
                    checked={formData.reservationType === type}
                    disabled={disabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        reservationType: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor={`reservation-${type}`}
                    style={
                      disabled ? { color: "#aaa", cursor: "not-allowed" } : {}
                    }
                    title={
                      disabled
                        ? "Discentes não podem selecionar Disciplina"
                        : ""
                    }
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="reservation-form__textarea-group">
          <label htmlFor="reservation-reason">Motivo da Reserva</label>
          <textarea
            id="reservation-reason"
            placeholder="Descreva o motivo da reserva..."
            value={formData.reason}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, reason: e.target.value }))
            }
          />
        </div>
      </section>

      <footer className="reservation-form__footer">
        <button
          type="submit"
          className="reservation-form__submit-btn"
          disabled={loading || !!error}
        >
          Solicitar reserva
        </button>
      </footer>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </form>
  );
}
