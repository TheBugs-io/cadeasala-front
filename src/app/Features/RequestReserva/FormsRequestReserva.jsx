import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/FormsRequestStyle.css";
import { getSalaPorId } from "../../service/mapa/salasService";
import { useAuth } from "../../contexts/AuthContext";

export default function ReservaForm() {
  const { idSala } = useParams();
  const { user } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      reservationType: formData.reservationType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      usuarioId: user?.id,
    };

    try {
      await solicitacaoReserva(salaInfo.id, payload);
      alert("Solicitação enviada!");
    } catch (error) {
      alert("Erro ao solicitar reserva.");
    }
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
            <label htmlFor="start-date">Data de início</label>
            <input
              id="start-date"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />

            <label htmlFor="end-date">Data de fim</label>
            <input
              id="end-date"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
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
            {["oficina", "disciplina", "outro"].map((type) => (
              <div key={type} className="reservation-form__radio-option">
                <input
                  id={`reservation-${type}`}
                  type="radio"
                  name="reservationType"
                  value={type}
                  checked={formData.reservationType === type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reservationType: e.target.value,
                    }))
                  }
                />
                <label htmlFor={`reservation-${type}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            ))}
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
    </form>
  );
}
