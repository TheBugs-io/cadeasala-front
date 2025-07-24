export const ordenarPorNumeracaoSala = (a, b) => {
  const regex = /^(\d+)([A-Z])$/;

  const [, numA, letraA] = a.numeracaoSala.match(regex) || [];
  const [, numB, letraB] = b.numeracaoSala.match(regex) || [];

  const numeroA = parseInt(numA);
  const numeroB = parseInt(numB);

  if (numeroA !== numeroB) {
    return numeroA - numeroB;
  }

  return letraA.localeCompare(letraB);
};
