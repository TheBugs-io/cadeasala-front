import { Link } from "react-router-dom";
import '../styles/TrilhaNavegacao.css';

{/* Tentando ver aquela questão de visualizar em que parte do site eu estou, esse componente serve pra mostrar o caminho, diferente do SIGAA. */}
const TrilhaNavegacao = ({ paths = [] }) => (
  <nav aria-label="breadcrumb" className="breadcrumb-container">
    {paths.map((item, index) => {
      const isLast = index === paths.length - 1;
      return (
        <p key={index}>
          {!isLast ? (
            <>
              <Link to={item.to}>{item.label}</Link>
              <span className="breadcrumb-separator">&gt;</span>
            </>
          ) : (
            <p className="status-navigate">{item.label}</p>
          )}
        </p>
      );
    })}
  </nav>
);


export default TrilhaNavegacao;