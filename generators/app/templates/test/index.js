import test from 'ava'
import <%= camelCaseName %> from '../src/'

test('sample test', t => {
  t.deepEqual(<%= camelCaseName %>(), true)
})
