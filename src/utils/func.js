export const wireEventValue = (setFn) => (e) => setFn(e.target.value)

// https://javascript.info/currying-partials#going-partial-without-context
export const partial =
  (func, ...argsBound) =>
  (...args) =>
    func.call(this, ...argsBound, ...args)
