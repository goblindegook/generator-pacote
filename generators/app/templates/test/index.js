import test from 'ava'
import <%= camelCaseName %> from '../src/'

test('sample test', t => {
  t.same(<%= camelCaseName %>(), true)
})
