import { Platform } from 'react-native';

export function format4TwoColumns<T>(data: T[], numColums: number): T[] {
  const rowsNumber = Math.floor(data.length / numColums);

  let numItemsLastRow = data.length - rowsNumber * numColums;

  while (numItemsLastRow !== numColums && numItemsLastRow !== 0) {
    data.push({ id: `blank-${numItemsLastRow}`, empty: true } as unknown as T);

    numItemsLastRow++;
  }

  return data;
}

export function formatCurrency(price: number) {
  return Platform.select({
    ios: price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    android: `R$ ${price}`,
  });
}

export function formatHour(hour: number) {
  return Platform.select({
    ios: (() =>
      hour.ToDateFormat().toLocaleTimeString('pt-br', {
        formatMatcher: 'best fit',
        hour: '2-digit',
        minute: '2-digit',
      }))(),
    android: (() =>
      hour
        .ToDateFormat()
        .toLocaleTimeString('pt-br', {
          formatMatcher: 'best fit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .slice(0, -3))(),
  });
}
