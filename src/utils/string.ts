export const capitalise = (s: string): string => {
  return s[0].toUpperCase() + s.substring(1)
}

export const random = () => {
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  )
}

export const isEmail = (email: string): boolean => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const isString = (str: string): boolean => typeof str === 'string'

export const retractMiddle = (string: string, maxLength: number): string => {
  if (!string) return string
  if (maxLength < 1) return string
  if (string.length <= maxLength) return string
  if (maxLength == 1) return string.substring(0, 1) + '...'

  var midpoint = Math.ceil(string.length / 2)
  var toremove = string.length - maxLength
  var lstrip = Math.ceil(toremove / 2)
  var rstrip = toremove - lstrip
  return (
    string.substring(0, midpoint - lstrip) +
    '...' +
    string.substring(midpoint + rstrip)
  )
}

export const retractEnd = (str, length) =>
  `${str.substring(0, length)} ${str.length > length ? '...' : ''}`

export const contains = (haystack: string, needle: string): boolean =>
  haystack.indexOf(needle) > -1

export const queryStringToObj = (queryString: string): object =>
  [...new URLSearchParams(queryString).entries()].reduce((prev, [key, val]) => {
    prev[key] = val
    return prev
  }, {})
