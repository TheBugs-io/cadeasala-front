import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../styles/ReservasSala.css";
function ListaReservas({ sala_id }) {
  function compararStringsPersonalizado(a, b) {
    // Função auxiliar para normalizar as strings
    const normalizar = (str) =>
      str
        .toLowerCase()
        .normalize("NFD") // separa acentos
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/ç/g, "c") // trata o ç manualmente
        .replace(/_/g, "") // remove underscores
        .replace(/\s+/g, ""); // remove espaços (opcional)

    return normalizar(a) === normalizar(b);
  }

  const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const [reservasAPI, setReservasAPI] = useState([]);

  useEffect(() => {
    async () => {
      try {
        const resp = await api.get(`/salas/reservas-da-sala?sala_id${sala_id}`);
        setReservasAPI(await resp.json());
      } catch (error) {
        console.log("Reservas não carregaram");
      }
    };
  }, []);

  //mlk isso vai criar um hashmap de dias da semana e horarios ocupados {seg: {8: reserva1, 10: reserva2}, ter:{14:reserva3}}
  //é bom que não tenha reserva dando conflito senao lascou
  //preferi isso pq é só acessar reservas["segunda"]["08:00"] pra ver oq ta acontecendo
  const reservasSorted = {};
  dias.forEach((d) => (reservasSorted[d] = {}));
  reservasAPI.forEach((r) => {
    if (r.repete) {
      for (let diarepetido of r.repeteEm) {
        for (let diaexistente of dias) {
          if (compararStringsPersonalizado(diarepetido, diaexistente)) {
            reservasSorted[diaexistente][r.horarioInicio] = r;
          }
        }
      }
    } else {
      for (let diaexistente of dias) {
        reservasSorted[diaexistente][r.horarioInicio] = r;
      }
    }
  });

  return (
    <div className="lista-reservas-container">
      {Object.keys(reservasSorted).map((dia) => (
        <div key={dia} className="todas-reservas">
          <h3 className="titulo-semana">{dia}</h3>
          <ul className="lista-reserva">
            {[8, 10, 14, 16, 18, 20].map((horario) => {
              const reserva = reservasSorted[dia][`${horario}:00`];
              const statusClass = reserva ? "ocupado" : "livre";
              return (
                <li
                  className={`item-reserva ${statusClass}`}
                  key={`${dia}-${horario}`}
                >
                    <b>
                  {`${horario}:00 - ${
                    reserva
                      ? reserva.titulo || reserva.nome || "Reservado"
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
