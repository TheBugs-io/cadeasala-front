import { Link } from "react-router-dom";
import '../styles/TrilhaNavegacao.css';

{/* Tentando ver aquela questão de visualizar em que parte do site eu estou, esse componente serve pra mostrar o caminho, diferente do SIGAA. */}
const TrilhaNavegacao = ({ paths = [] }) => (
  <nav aria-label="breadcrumb" className="breadcrumb-container">
    <ol className="breadcrumb-list">
      {paths.map((item, index) => {
        const isLast = index === paths.length - 1;
        return (
          <li key={item.to || index} className="breadcrumb-item">
            {!isLast ? (
              <>
                <Link to={item.to} className="breadcrumb-link">
                  {item.label}
                </Link>
                <span className="breadcrumb-separator" aria-hidden="true">
                  &gt;
                </span>
              </>
            ) : (
              <span className="status-navigate" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default TrilhaNavegacao;