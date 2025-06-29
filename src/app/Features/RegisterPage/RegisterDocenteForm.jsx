import { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";

const RegisterDocenteForm = () => {
  const [completeName, setCompleteName] = useState("");
  const [email, setEmail] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [nivelSuperior, setNivelSuperior] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [siape, setSiape] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nome: completeName,
      email,
      siape,
      vinculo,
      nivelSuperior,
      lotacao,
    };
    console.log("Dados do docente:", data);
    alert("Registro do docente enviado!");
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
        <h1 className="form-title">Registro de Docente</h1>

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
            value={completeName}
            onChange={(e) => setCompleteName(e.target.value)}
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
            placeholder="exemplo@ufc.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vinculo" className="form-label">
            Vínculo com a universidade
          </label>
          <select
            id="vinculo"
            name="vinculo"
            className="form-input"
            value={vinculo}
            onChange={(e) => setVinculo(e.target.value)}
            required
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
            Nível superior
          </label>
          <select
            id="nivelSuperior"
            name="nivelSuperior"
            className="form-input"
            value={nivelSuperior}
            onChange={(e) => setNivelSuperior(e.target.value)}
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
            value={lotacao}
            onChange={(e) => setLotacao(e.target.value)}
            required
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
            pattern="\d*"
            placeholder="Digite o número do SIAPE"
            value={siape}
            onChange={(e) => setSiape(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="form-button">
          Solicitar registro
        </button>
      </form>
    </div>
  );
};

export default RegisterDocenteForm;
