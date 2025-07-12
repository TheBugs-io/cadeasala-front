import { useState } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api";

const RegisterDocenteForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    siape: "",
    vinculo: "",
    nivelSuperior: "",
    lotacao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo: ${name} | Valor: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/register/solicitar", {
        ...formData,
        tipoUsuario: "DOCENTE",
      });
      navigate("/login", {
        state: { registeredEmail: formData.email },
      });
    } catch (error) {
      alert(error.response?.data?.error || "Falha ao cadastrar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="on"
      >
        <div className="form-link-group">
          <Link to="/login" className="form-link">
            Já tenho conta
          </Link>
        </div>
        <h1 className="form-title">Registro como docente</h1>

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
            placeholder="exemplo@ufc.br"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vinculo" className="form-label">
            Vínculo com a universidade <span>*</span>
          </label>
          <select
            id="vinculo"
            name="vinculo"
            className="form-input"
            value={formData.vinculo}
            onChange={handleChange}
            autoComplete="vinculo"
          >
            <option value="">Selecione o vínculo</option>
            <option value="EFETIVO">Efetivo</option>
            <option value="SUBSTITUTO">Substituto</option>
            <option value="TERCEIRIZADO">Terceirizado</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nivelSuperior" className="form-label">
            Nível superior <span>*</span>
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

        <div className="form-group">
          <label htmlFor="lotacao" className="form-label">
            Departamento ou curso de lotação
          </label>
          <input
            className="form-input"
            type="text"
            id="lotacao"
            name="lotacao"
            placeholder="Ex: Sistemas e Mídias Digitais"
            value={formData.lotacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="siape" className="form-label">
            SIAPE <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="siape"
            name="siape"
            inputMode="numeric"
            placeholder="Digite o número do SIAPE"
            value={formData.siape}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="form-button">
          {loading ? "Carregando..." : "Solicitar registro"}
        </button>
      </form>
    </div>
  );
};

export default RegisterDocenteForm;
