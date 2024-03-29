interface RandomObject<T> {
  [key: string]: T
}

interface IndexedObject<T> {
  [key: number]: T
}

/**
 * Method to convert a regular list of objects into a object map given a key => [{ a: 1, b: 2}, { a: 3, b: 4}] => { a: { a: 1, b: 2 }}
 * @param {Array} arr Array of values that will be converted into an object
 * @param {String} key String that will define which key will be used as the object key
 */
export const convertArrayToObject = <T>(
  arr: T[],
  key: string
): RandomObject<T> => {
  return arr.reduce(
    (acc, curr: any) => ({
      ...acc,
      [curr[key].toLowerCase()]: curr
    }),
    {}
  )
}

export const normalizeArrayToDropdown = (
  arr: IStockItem[] | IReitItem[]
): IDropdownItem[] =>
  arr.map((item) => ({
    value: item.papel.toLowerCase(),
    label: `${item['nome']} - ${item.papel}`
  }))

/**
 * Method to convert a regular list of objects into a object map given a key => { 0: { a: 1, b: 2 }, b: { 1: 2, b: 3} } => [{ a: 1, b: 2 }, { a: 2, b: 3}]
 * @param {Object} obj Object with keys as counters
 */
export const convertObjectToArray = <T>(obj: IndexedObject<T>): T[] =>
  Object.keys(obj).map((key: any) => ({
    ...obj[key]
  }))

/**
 * Method to convert a object of objects to objects of lists => { abev: { 0: { status: checked, statements: bla }, 1: { status: checked, statements: bla }}} => { abev: [{ status: checked}, {...}]}
 * @param obj
 * @returns
 */
export const convertObjectKeysToList = <T extends RandomObject<T>>(obj: T) =>
  Object.keys(obj).reduce((acc, key) => {
    return {
      ...acc,
      [key]: Object.values(obj[key]).map((item: T) => item)
    }
  }, {})

interface ArrayAlphabetically {
  [key: string]: any
}

export const sortArrayAlphabetically = <T extends ArrayAlphabetically>(
  arr: T[],
  key: string
): T[] =>
  arr.sort((a: T, b: T) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0))
