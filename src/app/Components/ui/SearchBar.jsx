import { useState, useRef, useEffect } from "react";
import "../../styles/SearchBar.css";
import SearchCardResult from "../cards/SearchCardResult";
import Modal from "./Modal";
const SearchBar = ({
  onSearch,
  resultados = { usuarios: [], salas: [], reservas: [] },
  esconder = false,
}) => {
  const [focado, setFocado] = useState(false);
  const containerRef = useRef(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);

  if (esconder) return null;

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const abrirModalSala = (sala) => {
    setSalaSelecionada(sala);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setSalaSelecionada(null);
  };

  useEffect(() => {
    function handleClickFora(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFocado(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const temUsuarios = resultados.usuarios.length > 0;
  const temSalas = resultados.salas.length > 0;
  const temReservas = resultados.reservas.length > 0;

  return (
    <div className="searchbar-container" ref={containerRef} style={{ position: "relative" }}>
      <label htmlFor="header-search" className="sr-only">
        Buscar por professor, reserva ou sala
      </label>
      <input
        id="header-search"
        type="text"
        className="header-search-input"
        placeholder="Pesquisar por professor, sala ou reserva..."
        aria-label="Pesquisar"
        onChange={handleChange}
        onFocus={() => setFocado(true)}
        autoComplete="off"
      />

      {focado && (
        <ul className="searchbar-dropdown">
          <li className="dropdown-group-title">Usuários</li>
          {temUsuarios ? (
            resultados.usuarios.map((u) => (
              <li key={u.id} className="searchbar-dropdown-item">
                <SearchCardResult tipo="usuario" item={u} />
              </li>
            ))
          ) : (
            <li className="searchbar-dropdown-item">Nenhum usuário encontrado</li>
          )}

          <li className="dropdown-group-title">Salas</li>
          {temSalas ? (
            resultados.salas.map((s) => (
              <li key={s.id} className="searchbar-dropdown-item">
                <SearchCardResult tipo="sala" item={s} onOpenModal={abrirModalSala} />
              </li>
            ))
          ) : (
            <li className="searchbar-dropdown-item">Nenhuma sala encontrada</li>
          )}

          <li className="dropdown-group-title">Reservas</li>
          {temReservas ? (
            resultados.reservas.map((r) => (
              <li key={r.id} className="searchbar-dropdown-item">
                <SearchCardResult tipo="reserva" item={r} />
              </li>
            ))
          ) : (
            <li className="searchbar-dropdown-item">Nenhuma reserva encontrada</li>
          )}
        </ul>
      )}

      {modalAberto && salaSelecionada && (
        <Modal
          sala={salaSelecionada}
          onClose={fecharModal}
        />
      )}
    </div>
  );
};

export default SearchBar;