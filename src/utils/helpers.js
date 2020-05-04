export const upperCase = word => word[0].toUpperCase() + word.slice(1)
export const replaceHyphen = word => word.replace(/-/g, " ")
export const makePretty = word => replaceHyphen(upperCase(word))
