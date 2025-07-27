export function ordenarPorNumeracaoSala(a, b) {
  const extrairNumeroLetra = (numeracao) => {
    if (!numeracao || typeof numeracao !== "string") {
      return [Number.MAX_SAFE_INTEGER, 'Z'];
    }

    numeracao = numeracao.toUpperCase();

    const regex = /^(\d+)([A-Z])$/;
    const match = numeracao.match(regex);
    if (!match) {
      return [Number.MAX_SAFE_INTEGER, 'Z'];
    }
    return [parseInt(match[1], 10), match[2]];
  };

  const [numA, letraA] = extrairNumeroLetra(a.numeracaoSala);
  const [numB, letraB] = extrairNumeroLetra(b.numeracaoSala);

  const ordemLinha = { 'E': 0, 'D': 1 };

  if (numA !== numB) {
    return numA - numB;
  }

  return (ordemLinha[letraA] ?? 99) - (ordemLinha[letraB] ?? 99);
}