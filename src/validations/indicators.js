const indicatorsValidator = (row, value) => {
  const style = {
    normal: 'normal',
    good: 'good',
    alert: 'alert',
    bad: 'bad',
  };

  switch (value) {
    case 'Cresc.5anos':
      if (row[value] > 0) return style.good;
      if (row[value] > -1 && row[value] <= 0) return style.alert;
      if (row[value] < -1) return style.bad;
      break;
    case 'Dividend Yield':
      if (row[value] > 0.05) return style.good;
      if (row[value] >= 0 && row[value] <= 0.05) return style.alert;
      if (row[value] < 0) return style.bad;
      break;
    case 'Dívida Bruta/Patrim.':
      if (row[value] < 1.15) return style.good;
      if (row[value] >= 1.15 && row[value] < 2) return style.alert;
      if (row[value] >= 2) return style.bad;
      break;
    case 'Líq. Corrente':
      if (row[value] >= 1) return style.good;
      if (row[value] >= 0 && row[value] < 1) return style.alert;
      if (row[value] < 0) return style.bad;
      break;
    case 'Margem Líquida':
      if (row[value] >= 0.1) return style.good;
      if (row[value] >= 0 && row[value] < 0.1) return style.alert;
      if (row[value] < 0) return style.bad;
      break;
    case 'ROE':
      if (row[value] >= 0.1) return style.good;
      if (row[value] >= 0 && row[value] < 0.1) return style.alert;
      if (row[value] < 0) return style.bad;
      break;
    default:
      return style.normal;
  }
};

export default indicatorsValidator;
