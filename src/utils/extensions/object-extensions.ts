export const isEmpty = (param: any) => {
  for (var key in param) {
    if (param.hasOwnProperty(key)) return false;
  }
  return true;
};

export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}
