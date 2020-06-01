export function checaItensDuplicados(array) {
  const novoArray = [...new Set(array)]
  return(array.length !== novoArray.length);
}
