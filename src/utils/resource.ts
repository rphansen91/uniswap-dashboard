export function resource<A, V>(fetchResource: (args: A) => Promise<V>) {
  let errors: { [argStr: string]: Error } = {}
  let results: { [argStr: string]: V|null } = {}
  let promises: { [argStr: string]: Promise<V> } = {}
  function reset () {
    errors = {}
    results = {}
    promises = {}
  }
  async function load (args: A) {
    const argStr = JSON.stringify(args)
    if (errors[argStr]) throw errors[argStr]
    if (results[argStr]) return results[argStr]
    if (promises[argStr]) return promises[argStr]
    promises[argStr] = fetchResource(args)
    .then(v => {
      results[argStr] = v
      return v
    })
    .catch(e => {
      errors[argStr] = e
      throw e
    })
    return promises[argStr]
  }
  return {
    reset,
    load
  }
}