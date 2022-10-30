const { strictEqual } = require('assert')
const test = require('tehanu')(__filename)
const shebang = require('rollup-plugin-shebang-bin')

test('exports', () => {
  strictEqual(typeof shebang, 'function')
})
