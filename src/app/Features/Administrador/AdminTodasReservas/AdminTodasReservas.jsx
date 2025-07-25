import React, { useEffect, useState } from 'react';
import './AdminTodasReservas.css';
import { FaPen, FaTrash, FaCheck, FaTimes, FaCog } from 'react-icons/fa';

function AdminTodasReservas() {
  const [reservas, setReservas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [mostrarDias, setMostrarDias] = useState(false);

  useEffect(() => {
    //TODO: Integração com reservas (lista - GET)
  }, []);

  const toggleDia = (dia) => {
    if (diasSelecionados.includes(dia)) {
      setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  };

  const diasDaSemana = [
    { label: 'D', valor: 'domingo' },
    { label: 'S', valor: 'segunda' },
    { label: 'T', valor: 'terca' },
    { label: 'Q', valor: 'quarta' },
    { label: 'Q', valor: 'quinta' },
    { label: 'S', valor: 'sexta' },
    { label: 'S', valor: 'sabado' },
  ];

  return (
    <div className="admin-container">
      <div className="top-bar">
        <h1 className="titulo-pagina">Todas as Reservas</h1>
        <button className="btn-editar" onClick={() => setModoEdicao(!modoEdicao)}>
          <FaCog /> {modoEdicao ? 'Fechar edição' : 'Editar'}
        </button>
      </div>

      <div className="dias-container">
        <label className="checkbox-principal">
          <input
            type="checkbox"
            checked={mostrarDias}
            onChange={() => setMostrarDias(!mostrarDias)}
          />
          Escolher dias
        </label>

        {mostrarDias && (
          <div className="dias-opcoes">
            {diasDaSemana.map((dia, index) => (
              <div
                key={index}
                className={`dia-circulo ${diasSelecionados.includes(dia.valor) ? 'selecionado' : ''}`}
                onClick={() => toggleDia(dia.valor)}
              >
                {dia.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cards-container">
        {reservas.map((reserva, index) => (
          <div key={index} className="card">
            <div className="card-titulo">{reserva.titulo || 'Nome da Reserva'}</div>
            <div className="card-info">
              <p>Data: {reserva.data || '00/00/0000'}</p>
              <p>Horário: {reserva.horario || '00:00'}</p>
            </div>
            {modoEdicao && (
              <div className="card-acoes">
                <button className="btn-icon"><FaPen /></button>
                <button className="btn-icon"><FaTrash /></button>
                <button className="btn-icon"><FaCheck /></button>
                <button className="btn-icon"><FaTimes /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTodasReservas;