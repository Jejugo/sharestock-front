import Validator from './validator'
interface Style {
  normal: string
  good: string
  alert: string
  bad: string
}

const indicatorsValidator = (
  row: IFundamentusStockItem,
  value: string
): string | null => {
  const style: Style = {
    normal: 'normal',
    good: 'good',
    alert: 'alert',
    bad: 'bad'
  }

  switch (value) {
    case 'Cresc.5anos':
      if (row[value] > Validator[value].good.lowerLimit) return style.good
      if (
        row[value] > Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'Dividend Yield':
      if (row[value] > Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'Dívida Bruta/Patrim.':
      if (row[value] < Validator[value].good.upperLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] >= Validator[value].bad.lowerLimit) return style.bad
      break
    case 'Líq. Corrente':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'Margem Líquida':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'ROE':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'P/VP':
      if (
        row[value] <= Validator[value].good.upperLimit &&
        row[value] >= Validator[value].good.lowerLimit
      )
        return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (
        row[value] > Validator[value].bad.upperLimit ||
        row[value] < Validator[value].bad.lowerLimit
      )
        return style.bad
      break
    case 'P/VP':
      if (
        row[value] <= Validator[value].good.upperLimit &&
        row[value] >= Validator[value].good.lowerLimit
      )
        return style.good
      if (
        row[value] > Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (
        row[value] > Validator[value].bad.upperLimit ||
        row[value] < Validator[value].bad.lowerLimit
      )
        return style.bad
      break
    case 'P/L':
      if (
        row[value] >= Validator[value].good.lowerLimit &&
        row[value] <= Validator[value].good.upperLimit
      )
        return style.good
      if (
        row[value] > Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (
        row[value] > Validator[value].bad.lowerLimit ||
        row[value] < Validator[value].bad.lowerLimit
      )
        return style.bad
      break
    default:
      return style.normal
  }

  return null
}

export default indicatorsValidator
