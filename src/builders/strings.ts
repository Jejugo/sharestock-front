export const capitalizeFirstWord = (sentence: string): string => {
  const words = sentence.split(' ')
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(' ')
}
