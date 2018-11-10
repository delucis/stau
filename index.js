const VLDT = require('aproba')

module.exports = async function stau (functions, limit = 15) {
  VLDT('A|AN', arguments)
  const pending = new Set()

  return Promise.all(functions.map(async fn => {
    while (pending.size >= limit) {
      await Promise.race(pending)
    }

    const promise = fn()
    pending.add(promise)
    await promise
    pending.delete(promise)
    return promise
  }))
}
