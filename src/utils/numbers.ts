import numbro from 'numbro'

export const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
  if (num === 0) return '$0.00'
  if (!num) return '-'
  if (num < 0.001 && digits <= 3) {
    return '<$0.001'
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  })
}

export const formatLocaleAmount = (num: number | string | undefined | never[], maxFractionDigits = 3) => {
  return num?.toLocaleString('en-US', { maximumFractionDigits: maxFractionDigits })
}

export const formatNumberToString = (num: number, scale: number): string => {
  return floorToScale(num, scale).toFixed(scale)
}

export const floorToScale = (x: number, scale: number) => {
  let sign = x < 0 ? -1 : 1;
  return sign * Math.floor(Math.abs(x) * Math.pow(10, scale)) * Math.pow(10, -scale);
};