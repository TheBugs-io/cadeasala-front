import "../styles/CardSalaStyle.css";
import { MdOpenInNew } from "react-icons/md";
import { formatterLocalizacao, formatterTipo, getImagemPorTipo } from "../../../../helper/salasHelper";

const CardSalaLayout = ({
  salas = [],
  onSettingsClick = () => {},
  onCardClick = () => {},
}) => {

  return (
    <div className="room-card-grid">
      {salas.map((sala) => (
        <div
          key={sala.id}
          className="room-card"
          onClick={() => onCardClick(sala)}
          role="button"
          tabIndex={0}
          aria-label={`Detalhes da sala ${sala.nome}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCardClick(sala);
            }
          }}
        >
          <div className="room-card-header">
            <div className="room-badge">
              {formatterTipo(sala.tipo) || "Sala"}
            </div>
            <div
              className="settings-icon"
              onClick={(e) => {
                e.stopPropagation();
                onSettingsClick(sala);
              }}
              role="button"
              tabIndex={0}
              aria-label="Abrir configurações da sala"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onSettingsClick(sala);
                }
              }}
            >
              <MdOpenInNew />
            </div>
          </div>

          <div className="room-illustration">
            <img
              src={sala.fotoUrl || getImagemPorTipo(sala.tipo)}
              alt={`Imagem ilustrativa da sala ${sala.nome}`}
              className="room-image"
            />
          </div>

          <div className="room-admin-content">
            <h2 className="room-title">{sala.nome}</h2>
            <p className="room-subtitle">
              {formatterLocalizacao(sala.localizacao)} -{" "}
              {sala.numeracaoSala || "Sem numeração"}
            </p>
            <p className="room-description">
              "{sala.descricao || "Sem descrição."}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSalaLayout;