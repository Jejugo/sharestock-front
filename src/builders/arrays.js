/**
 * Method to convert a regular list of objects into a object map given a key => [{ a: 1, b: 2}] => { a: { a: 1, b: 2 }}
 * @param {Array} arr Array of values that will be converted into an object
 * @param {String} key String that will define which key will be used as the object key
 */
export const convertArrayToObject = (arr, key) => {
  return arr.reduce(
    (acc, curr) => ({
      ...acc,
      [curr[key].toLowerCase()]: curr,
    }),
    {},
  );
};

export const normalizeArrayToDropdown = arr =>
  arr.map(item => ({
    value: item['Papel'].toLowerCase(),
    label: `${item['nome']} - ${item['Papel']}`,
  }));

/**
 * Method to convert a regular list of objects into a object map given a key => { 0: { a: 1, b: 2 }, b: { 1: 2, b: 3} } => [{ a: 1, b: 2 }, { a: 2, b: 3}]
 * @param {Object} obj Object with keys as counters
 */
export const convertObjectToArray = obj =>
  Object.keys(obj).map(key => ({
    ...obj[key],
  }));
