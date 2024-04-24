import Validator from './validator'
interface Style {
  normal: string
  good: string
  alert: string
  bad: string
}

export const reitsIndicatorsValidator = (
  row: IReitItem,
  value: string
): string | null => {
  const style: Style = {
    normal: 'normal',
    good: 'good',
    alert: 'alert',
    bad: 'bad'
  }

  switch (value) {
    case 'quantidadeDeImoveis':
      if (row[value] > 5) return style.good
      if (row[value] > 0 && row[value] <= 5) return style.alert
      if (row[value] === 0) return style.bad
      break

    case 'vacanciaMedia':
      if (row[value] <= 0.1) return style.good
      if (row[value] > 0.1 && row[value] <= 0.2) return style.alert
      if (row[value] > 0.2) return style.bad
      break

    default:
      return style.normal
  }

  return null
}
