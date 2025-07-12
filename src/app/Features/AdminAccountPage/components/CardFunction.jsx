import '../styles/CardFunctionStyle.css';

const CardFuncionality = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="card-functionality"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
        <div className='card-functionality-icon'>
          <div className="icon-container">
            {icon}
          </div>
        </div>
      <h3 className="functionality-title">{title}</h3>
      <p className="functionality-description">{description}</p>
    </div>
  );
};

export default CardFuncionality;