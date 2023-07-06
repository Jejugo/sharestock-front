export const formatSubmitData = (data: any) => {
  const formattedData = Object.keys(data).reduce((acc, key) => {
    const { statements } = data[key]
    return {
      ...acc,
      [key]: statements
    }
  }, {})
  return formattedData
}

export const formatGetData = (data: any) => {
  const formattedData = Object.keys(data).reduce((acc, key) => {
    const statements = data[key]
    return {
      ...acc,
      [key]: {
        statement: '',
        weight: '',
        statements: statements
      }
    }
  }, {})
  return formattedData
}
