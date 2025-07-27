import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../styles/ReservasSala.css";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

function ListaReservas({ sala_id }) {
  const [reservasAPI, setReservasAPI] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const resp = await api.get(
          `/salas/reservas-da-sala?sala_id=${sala_id}`
        );
        setReservasAPI(resp.data);
      } catch (error) {
        console.log("Reservas não carregaram");
      }
    };

    fetchReservas();
  }, [sala_id]);

  const proximos7Dias = Array.from({ length: 7 }).map((_, i) => {
    const data = addDays(new Date(), i);
    return {
      dataISO: format(data, "yyyy-MM-dd"),
      rotulo: format(data, "EEEE, dd/MM", { locale: ptBR }),
    };
  });

  const reservasPorData = {};
  proximos7Dias.forEach(({ dataISO }) => {
    reservasPorData[dataISO] = {};
  });

  reservasAPI.forEach((reserva) => {
    const data = reserva.dataInicio?.split("T")[0];
    if (reservasPorData[data]) {
      const horaFormatada = `${String(reserva.horarioInicio).padStart(2, "0")}:00`;
      reservasPorData[data][horaFormatada] = reserva;
    }
  });

  return (
    <div className="lista-reservas-container">
      {proximos7Dias.map(({ dataISO, rotulo }) => (
        <div key={dataISO} className="todas-reservas">
          <h3 className="titulo-semana">{rotulo}</h3>
          <ul className="lista-reserva">
            {[8, 10, 14, 16, 18, 20].map((horario) => {
              const horaFormatada = `${horario}:00`;
              const reserva = reservasPorData[dataISO][horaFormatada];
              const tipoClasse = reserva?.tipo ? reserva.tipo.toLowerCase() : "";
              const statusClass = reserva ? `ocupado ${tipoClasse}` : "livre";
              const horaFim = reserva?.horarioFim ? `- ${reserva.horarioFim}:00` : "";

              return (
                <li
                  className={`item-reserva ${statusClass}`}
                  key={`${dataISO}-${horario}`}
                >
                  <b>
                    {`${horaFormatada} ${horaFim} | ${
                      reserva
                        ? reserva.responsavel?.nomeCompleto ||
                          reserva.nome ||
                          "Reservado"
                        : "Livre"
                    }`}
                  </b>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListaReservas;