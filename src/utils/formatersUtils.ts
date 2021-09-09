export function format4TwoColumns<T>(data: T[], numColums: number): T[] {

  const rowsNumber = Math.floor(data.length / numColums)

  let numItemsLastRow = data.length - (rowsNumber * numColums)

  while (numItemsLastRow !== numColums && numItemsLastRow !== 0) {
    data.push({ id: `blank-${numItemsLastRow}`, empty: true } as unknown as T)

    numItemsLastRow++;
  }

  return data;
}
