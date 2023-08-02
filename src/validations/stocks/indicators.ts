import Validator from './validator'
interface Style {
  normal: string
  good: string
  alert: string
  bad: string
}

const indicatorsValidator = (
  row: IStockItem & IReitItem,
  value: string
): string | null => {
  const style: Style = {
    normal: 'normal',
    good: 'good',
    alert: 'alert',
    bad: 'bad'
  }

  switch (value) {
    // STOCKS
    case 'crescimento5Anos':
      if (row[value] > Validator[value].good.lowerLimit) return style.good
      if (
        row[value] > Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'dividendYield':
      if (row[value] > Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] <= Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'dividaBruta_pl':
      if (row[value] < Validator[value].good.upperLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] >= Validator[value].bad.lowerLimit) return style.bad
      break
    case 'liquidezCorrente':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'margemLiquida':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'roe':
      if (row[value] >= Validator[value].good.lowerLimit) return style.good
      if (
        row[value] >= Validator[value].alert.lowerLimit &&
        row[value] < Validator[value].alert.upperLimit
      )
        return style.alert
      if (row[value] < Validator[value].bad.upperLimit) return style.bad
      break
    case 'p_vp':
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
    case 'p_l':
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

    // FIIS
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

export default indicatorsValidator
