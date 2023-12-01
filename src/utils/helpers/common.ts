export function roundToPrecision(number: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

export const validateRateInputValue = (value: number, initValue: number): boolean => {
  return Number(value) >= Number(initValue) * 0.9 && Number(value) <= Number(initValue) * 1.1
}