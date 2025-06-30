import { useState } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api.js'

const RegisterFormDiscente = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    matricula: "",
    nivelSuperior: "",
    smd: false,
    curso: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "smd") {
      setFormData({
        ...formData,
        smd: value === "sim",
        curso: value === "sim" ? "Sistemas e Mídias Digitais" : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/auth/register/solicitar", {
        ...formData,
        tipoUsuario: "DISCENTE",
      });
      navigate("/login", { state: { registeredEmail: formData.email } });
    } catch (error) {
      alert(error.response?.data?.error || "Falha ao cadastrar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container" autoComplete="on">
        <div className="form-link-group">
          <Link to="/login" className="form-link">
            Já tenho conta
          </Link>
        </div>

        <h1 className="form-title">Registro de Discente</h1>

        <div className="form-group">
          <label htmlFor="nomeCompleto" className="form-label">
            Nome completo <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            placeholder="Digite seu nome completo"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail institucional <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@alu.ufc.br"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="matricula" className="form-label">
            Matrícula <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            inputMode="numeric"
            id="matricula"
            name="matricula"
            placeholder="Digite sua matrícula UFC"
            value={formData.matricula}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nivelSuperior" className="form-label">
            Nível superior
          </label>
          <select
            id="nivelSuperior"
            name="nivelSuperior"
            className="form-input"
            value={formData.nivelSuperior}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um nível</option>
            <option value="GRADUACAO">Graduação</option>
            <option value="POS_GRADUACAO">Pós-graduação</option>
            <option value="MESTRADO">Mestrado</option>
            <option value="DOUTORADO">Doutorado</option>
            <option value="POS_DOUTORADO">Pós-doutorado</option>
          </select>
        </div>

        <fieldset className="form-group" role="group" aria-labelledby="smdGroup">
          <legend id="smdGroup" className="form-label">
            Você é aluno de Sistemas e Mídias Digitais?
          </legend>
          <div>
            <label>
              <input
                type="radio"
                name="smd"
                value="sim"
                checked={formData.smd === true}
                onChange={handleChange}
              />{" "}
              Sim
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="smd"
                value="não"
                checked={formData.smd === false}
                onChange={handleChange}
              />{" "}
              Não
            </label>
          </div>
        </fieldset>

        {!formData.smd && (
          <div className="form-group">
            <label htmlFor="curso" className="form-label">
              Qual seu curso?
            </label>
            <input
              className="form-input"
              type="text"
              id="curso"
              name="curso"
              placeholder="Digite o nome do seu curso"
              value={formData.curso}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading} className="form-button">
          {loading ? "Enviando..." : "Solicitar registro"}
        </button>
      </form>
    </div>
  );
};

export default RegisterFormDiscente;