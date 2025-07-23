import '../styles/CardSalaStyle.css';

const CardSalaLayout = ({ 
  badgeText = "Sala", 
  title = "Sala 1", 
  subtitle = "PRIMEIRO ANDAR - A101", 
  description = "Descrição da sala",
  imageUrl = "src/app/assets/salas/lab.jpg",
  imageAlt = "Ilustração da sala",
  showSettingsIcon = true,
  onSettingsClick = () => {},
  onCardClick = () => {}
}) => {
  return (
    <div className="room-card" onClick={onCardClick}>
      {/* Header */}
      <div className="room-card-header">
        <div className="room-badge">{badgeText}</div>
        {showSettingsIcon && (
          <div className="settings-icon" onClick={(e) => {
            e.stopPropagation();
            onSettingsClick();
          }}>
            🔧
          </div>
        )}
      </div>

      {/* Illustration */}
      <div className="room-illustration">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="room-image"
        />
      </div>

      {/* Content */}
      <div className="room-content">
        <h2 className="room-title">{title}</h2>
        <p className="room-subtitle">{subtitle}</p>
        <p className="room-description">"{description}"</p>
      </div>
    </div>
  );
};

export default CardSalaLayout;