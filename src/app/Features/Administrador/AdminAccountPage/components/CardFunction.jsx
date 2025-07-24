import '../styles/CardFunctionStyle.css';

const CardFuncionality = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="card-functionality"
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${description}`}
    >
      <div className='card-functionality-icon'>
        <div className="icon-container" aria-hidden="true">
          {icon}
        </div>
      </div>
      <h3 className="functionality-title" tabIndex={0}>{title}</h3>
      <p className="functionality-description" tabIndex={0}>{description}</p>
    </div>
  );
};

export default CardFuncionality;
