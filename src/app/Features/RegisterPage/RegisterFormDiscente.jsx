import { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";

const RegisterFormDiscente = () => {
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [completeName, setCompleteName] = useState("");
  const [nivelSuperior, setNivelSuperior] = useState("");
  const [isSMDStudent, setIsSMDStudent] = useState(true);
  const [curso, setCurso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nome: completeName,
      email,
      matricula,
      nivelSuperior,
      smd: isSMDStudent,
      curso: isSMDStudent ? "Sistemas e Mídias Digitais" : curso,
    };
    console.log("Dados enviados:", data);
    alert("Registro enviado!");
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
        <h1 className="form-title">Registro</h1>

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
            placeholder="exemplo@alu.ufc.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
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

        <fieldset
          className="form-group"
          role="group"
          aria-labelledby="smdGroup"
        >
          <legend id="smdGroup" className="form-label">
            Você é aluno de Sistemas e Mídias Digitais?
          </legend>
          <div>
            <label>
              <input
                type="radio"
                name="smd"
                value="sim"
                checked={isSMDStudent}
                onChange={() => setIsSMDStudent(true)}
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
                checked={!isSMDStudent}
                onChange={() => setIsSMDStudent(false)}
              />{" "}
              Não
            </label>
          </div>
        </fieldset>

        {!isSMDStudent && (
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
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="form-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterFormDiscente;
