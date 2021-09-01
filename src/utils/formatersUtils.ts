export function format4TwoColumns<T>(data: T[], numColums: number, blankObject: any): T[] {

  const rowsNumber = Math.floor(data.length / numColums)

  let numItemsLastRow = data.length - (rowsNumber * numColums)

  while (numItemsLastRow !== numColums && numItemsLastRow !== 0) {
    data.push({ id: `blank-${numItemsLastRow}`, ...blankObject })

    numItemsLastRow++;
  }

  return data;
}
