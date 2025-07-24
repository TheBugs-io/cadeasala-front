export function ordenarPorNumeracaoSala(a, b) {
  const extrairNumeroLetra = (numeracao) => {
    const regex = /^(\d+)([A-Z])$/i;
    const match = numeracao.match(regex);
    if (!match) {
      return [Number.MAX_SAFE_INTEGER, 'Z'];
    }
    return [parseInt(match[1], 10), match[2].toUpperCase()];
  };

  const [numA, letraA] = extrairNumeroLetra(a.numeracaoSala);
  const [numB, letraB] = extrairNumeroLetra(b.numeracaoSala);

  const ordemLinha = { 'E': 0, 'D': 1 };

  if (numA !== numB) {
    return numA - numB;
  }

  return (ordemLinha[letraA] ?? 99) - (ordemLinha[letraB] ?? 99);
}
