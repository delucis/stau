import test from 'ava'
import del from 'delay'
import stau from '.'

test('imports module', t => {
  t.is(typeof stau, 'function')
})

test('it can run concurrently', async t => {
  const t0 = Date.now()
  const tasks = [3000, 5000, 2000, 5000, 1000, 1500].map(n => async () => del(n))
  await stau(tasks, Infinity)
  const t1 = Date.now()
  t.true(t1 - t0 < 6000)
})

test('it can run in series', async t => {
  const t0 = Date.now()
  const tasks = [3000, 5000, 2000, 5000].map(n => async () => del(n))
  await stau(tasks, 1)
  const t1 = Date.now()
  t.true(t1 - t0 >= 1500)
})

test('it can be called without a second argument', async t => {
  const tasks = [async () => {}]
  await t.notThrowsAsync(() => stau(tasks))
})

test('it throws with bad arguments', async t => {
  await t.throwsAsync(stau)
  await t.throwsAsync(async () => stau([], 'jolly'))
})
