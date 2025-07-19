import '../styles/CardGeneric.css';

const GenericCard = ({ 
  title = "Laboratório 05",
  subtitle = "Terça (14h-16h)",
  dateRange = "17/07/25 - 18/07/25",
  topLeftLabel = "Renanzinho",
  topRightLabel = "Discente",
  bottomLabel = null,
  bottomLabelColor = "#8B5CF6"
}) => {
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