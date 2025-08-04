import { useMemo } from "react";

const BLOCOS_HORARIOS = [
  { label: "08h-10h", inicio: 8, fim: 10 },
  { label: "10h-12h", inicio: 10, fim: 12 },
  { label: "14h-16h", inicio: 14, fim: 16 },
  { label: "16h-18h", inicio: 16, fim: 18 },
  { label: "18h-20h", inicio: 18, fim: 20 },
  { label: "20h-22h", inicio: 20, fim: 22 },
];

export function useHorarioAtual() {
  return useMemo(() => {
    const hora = new Date().getHours();
    return (
      BLOCOS_HORARIOS.find(({ inicio, fim }) => hora >= inicio && hora < fim)?.label ||
      BLOCOS_HORARIOS[0].label
    );
  }, []);
}

export const HORARIOS_DISPONIVEIS = BLOCOS_HORARIOS;