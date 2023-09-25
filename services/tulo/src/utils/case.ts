export const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
}

export const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const toSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`)
}
