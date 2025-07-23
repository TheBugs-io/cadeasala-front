import '../styles/CardGeneric.css';

const GenericCard = ({ data = {}, type = "reserva" , bottomLabelColor = "#8B5CF6" }) => {
  const title = data.local?.nome || data.nome || "Sem título";
  
  const subtitle = type === "reserva"
    ? `${data.diaSemana || ""} (${data.horarioInicio}h - ${data.horarioFim}h)`
    : `${data.dataInicio ? new Date(data.dataInicio).toLocaleDateString() : ""}`;

  const dateRange = type === "reserva"
    ? `${data.dataInicio ? new Date(data.dataInicio).toLocaleDateString() : ""} - ${data.dataFim ? new Date(data.dataFim).toLocaleDateString() : ""}`
    : `${data.dataInicio ? new Date(data.dataInicio).toLocaleDateString() : ""} - ${data.dataFim ? new Date(data.dataFim).toLocaleDateString() : ""}`;
  
  const topLeftLabel = data.usuario?.nomeCompleto || data.responsavel?.nomeCompleto || "Desconhecido";
  
  const topRightLabel = data.usuario?.tipo || data.status || "";

  const bottomLabel = data.status || null;

  return (
    <div className="generic-card">
      <div className="card-header">
        <span className="top-left-label">{topLeftLabel}</span>
        <span className="top-right-label">{topRightLabel}</span>
      </div>

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-details">
          <span className="subtitle">{subtitle}</span>
          <span className="date-range">{dateRange}</span>
        </div>
      </div>

      {bottomLabel && (
        <div className="card-footer">
          <span
            className="bottom-label"
            style={{ backgroundColor: bottomLabelColor }}
          >
            {bottomLabel}
          </span>
        </div>
      )}
    </div>
  );
};

export default GenericCard;
