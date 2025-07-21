import React, { useState } from "react";
import "./DetalhesAdmin.css";
import TrilhaNavegacao from "../../Components/TrilhaNavegacao";

const DetalhesAdmin = () => {
  const [espaco, setEspaco] = useState("Ateliê");
  const [responsavel, setResponsavel] = useState("Lia Aires de Castro");
  const [tipoUsuario, setTipoUsuario] = useState("Discente");
  const [data, setData] = useState("Terça (18/07/25)");
  const [horario, setHorario] = useState("10h–12h");
  const [tipoConteudo, setTipoConteudo] = useState("Oficina");
  const [repetirDias, setRepetirDias] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState([]);

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const diasSemana = ["S", "T", "Q", "Q", "S", "S", "D"];

  return ( 
    <main className="detalhes-admin-container">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Reservas" },
          { label: "Detalhes da reserva" },
        ]}
      />

      <div className="detalhes-admin-content">
        <img
          src="/placeholder-img.png"
          alt="Imagem do espaço"
          className="detalhes-admin-image"
        />

        <div className="detalhes-admin-info">
          <input
            type="text"
            value={espaco}
            onChange={(e) => setEspaco(e.target.value)}
            className="title-input"
          />

          <div className="linha-flex">
            <p>
              <strong>Responsável:</strong>{" "}
              <input
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="responsavel-user"
              />
            </p>

            <input
              type="text"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="sub-input alinhado-direita"
            />
          </div>

          <div className="linha-flex">
            <p>
              <strong>{data}</strong>
            </p>
            <p>{horario}</p>
          </div>

          <input
            type="text"
            value={tipoConteudo}
            onChange={(e) => setTipoConteudo(e.target.value)}
            className="tag-oficina"
          />

          <label className="repetir-checkbox">
            <input
              type="checkbox"
              checked={repetirDias}
              onChange={(e) => setRepetirDias(e.target.checked)}
            />
            Repetir dias da semana
          </label>

          {repetirDias && (
            <div className="dias-semana">
              {diasSemana.map((dia, i) => (
                <button
                  key={i}
                  className={`dia-botao ${
                    diasSelecionados.includes(dia) ? "ativo" : ""
                  }`}
                  onClick={() => toggleDia(dia)}
                >
                  {dia}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetalhesAdmin;