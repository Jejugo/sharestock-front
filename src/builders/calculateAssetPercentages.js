const NEGATIVE_DEFAULT = 0.01;

export default (resistancePoints) => {
  const positiveAssets = Object.entries(resistancePoints)
    .map(
      ([key, val]) =>
        resistancePoints[key] >= 0 && {
          name: key,
          points: resistancePoints[key],
        }
    )
    .filter((a) => a);

  const negativeAssets = Object.entries(resistancePoints)
    .map(([key, val]) => {
      if (resistancePoints[key] < 0) {
        return {
          name: key,
          points: resistancePoints[key],
        };
      }
    })
    .filter((a) => a);

  const negativeAssetCalculation =
    negativeAssets.length &&
    negativeAssets.reduce(
      (acc, asset, index) => ({
        ...acc,
        [asset.name]: NEGATIVE_DEFAULT,
      }),
      {}
    );

  const valueToTake = (
    (NEGATIVE_DEFAULT * Object.keys(negativeAssetCalculation).length) /
    positiveAssets.length
  ).toFixed(4);

  const positveAssetCalculation = positiveAssets.reduce(
    (acc, asset) => ({
      ...acc,
      [asset.name]:
        asset.points /
          positiveAssets.reduce((acc, asset) => acc + asset.points, 0) -
        valueToTake,
    }),
    {}
  );

  const percentagesArray = Object.entries({
    ...positveAssetCalculation,
    ...negativeAssetCalculation,
  }).map(([key, value]) => ({
    name: key,
    percentage: `${value >= 0 && value < 0.01 ? (0.01 * 100).toFixed(2) : (value * 100).toFixed(2)}%`,
    points: resistancePoints[key],
  })).sort((a, b) => {
    let textA = a.name.toUpperCase();
    let textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
  return percentagesArray
};
