import React, { useState } from "react";
import "./DetalhesAdmin.css";
import TrilhaNavegacao from "../../Components/ui/TrilhaNavegacao";

const DetalhesAdmin = () => {
  const [espaco, setEspaco] = useState("Ateliê");
  const [responsavel, setResponsavel] = useState("Lia Aires de Castro");
  const [tipoUsuario, setTipoUsuario] = useState("Discente");
  const [data, setData] = useState("Terça (18/07/25)");
  const [horario, setHorario] = useState("10h–12h");
  const [tipoConteudo, setTipoConteudo] = useState("Oficina");
  const [repetirDias, setRepetirDias] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState([]);

  const handleToggleDia = (valor) => {
    setDiasSelecionados((prev) =>
      prev.includes(valor) ? prev.filter((d) => d !== valor) : [...prev, valor]
    );
  };

  const diasDaSemana = [
    { label: "D", valor: "domingo" },
    { label: "S", valor: "segunda" }, // S1
    { label: "T", valor: "terca" },
    { label: "Q", valor: "quarta" },
    { label: "Q", valor: "quinta" },  // Q2
    { label: "S", valor: "sexta" },   // S2
    { label: "S", valor: "sabado" },  // S3
  ];

  const diasInternos = [
    { label: "D", valor: "D", nome: "Domingo" },
    { label: "S", valor: "U", nome: "Segunda" },
    { label: "T", valor: "T", nome: "Terça" },
    { label: "Q", valor: "Q", nome: "Quarta" },
    { label: "Q", valor: "X", nome: "Quinta" },
    { label: "S", valor: "B", nome: "Sexta" },
    { label: "S", valor: "A", nome: "Sábado" },
  ];

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
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="sub-input"
            />
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="sub-input alinhado-direita"
            />
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
              {diasInternos.map((dia, index) => (
                <button
                  key={index}
                  title={dia.nome}
                  className={`dia-botao ${
                    diasSelecionados.includes(dia.valor) ? "ativo" : ""
                  }`}
                  onClick={() => handleToggleDia(dia.valor)}
                >
                  {dia.label}
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