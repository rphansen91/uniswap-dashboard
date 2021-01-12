export const n = (num: number, d = 4) =>
  num.toLocaleString(undefined, {
    maximumFractionDigits: d,
    minimumFractionDigits: d,
  });