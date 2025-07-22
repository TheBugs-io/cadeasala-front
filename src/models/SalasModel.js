export const salas = [
  {
    id: 1,
    status: "RESERVADA",
    sala: "Sala 01",
    localizacao: "PRIMEIRO_ANDAR",
    reservas: [
      {
        id: "r1",
        tipo: "DISCIPLINA",
        nomeDisciplina: "Design de Interfaces Gráficas",
        professor: "Inga Freire Sabóia",
        horario: "Ter–Qui (14h–16h)",
      },
    ],
  },
  {
    id: 2,
    status: "LIVRE",
    sala: "Sala 02",
    localizacao: "PRIMEIRO_ANDAR",
  },
  {
    id: 3,
    status: "RESERVADA",
    sala: "Sala 03",
    localizacao: "PRIMEIRO_ANDAR",
    reservas: [
      {
        id: "r2",
        tipo: "RESERVA",
        autor: "Lucas Braga",
        horario: "Qua (10h–12h)",
      },
    ],
  },
  {
    id: 4,
    status: "RESERVADA",
    sala: "Sala 04",
    localizacao: "SEGUNDO_ANDAR",
    reservas: [
      {
        id: "r3",
        tipo: "DISCIPLINA",
        nomeDisciplina: "Banco de Dados",
        professor: "Ana Paula Ribeiro",
        horario: "Seg–Qua (08h–10h)",
      },
    ],
  },
  {
    id: 5,
    status: "EM_MANUTENCAO",
    sala: "Sala 05",
    localizacao: "SEGUNDO_ANDAR",
  },
  {
    id: 6,
    status: "RESERVADA",
    sala: "Sala 06",
    localizacao: "PRIMEIRO_ANDAR",
  },
  {
    id: 7,
    status: "LIVRE",
    sala: "Sala 07",
    localizacao: "PRIMEIRO_ANDAR",
  },
  {
    id: 8,
    status: "RESERVADA",
    sala: "Sala 08",
    localizacao: "PRIMEIRO_ANDAR",
    reservas: [
      {
        id: "r4",
        tipo: "RESERVA",
        autor: "Maria Clara",
        horario: "Sex (14h–16h)",
      },
    ],
  },
];
