import tehanu from 'tehanu'
import { fileURLToPath } from 'node:url'
import { stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { equal, ok } from 'node:assert'
import { rollup } from 'rollup'
import shebang from '../lib/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const test = tehanu(import.meta.url)

function compile(name, options) {
  return rollup({
    input: join(__dirname, `input/${name}`),
    plugins: [shebang(options)],
  })
}

async function generate(bundle, options = {}) {
  const { output } = await bundle.generate({
    format: 'cjs', strict: false, ...options
  })
  return output[0]
}

async function write(bundle, name) {
  const file = join(__dirname, `output/${name}.js`)
  await bundle.write({ file, format: 'cjs', strict: false })
  return stat(file)
}

async function build(name, input, output) {
  const bundle = await compile(name, input)
  return typeof output !== 'string' ? generate(bundle, output) : write(bundle, output)
}

test('insert default shebang.js', async () => {
  const { code } = await build('no-shebang.js')
  equal('#!/usr/bin/env node\n\nconsole.log();\n', code)
})

test('insert other shebang.js', async () => {
  const { code } = await build('no-shebang.js', { shebang: '#!/usr/bin/node' })
  equal('#!/usr/bin/node\n\nconsole.log();\n', code)
})

test('insert other dynamic shebang.js', async () => {
  const { code } = await build('no-shebang.js', { shebang: () => '#!/usr/bin/node' })
  equal('#!/usr/bin/node\n\nconsole.log();\n', code)
})

test('insert default shebang with other separator', async () => {
  const { code } = await build('no-shebang.js', { separator: '\n' })
  equal('#!/usr/bin/env node\nconsole.log();\n', code)
})

test('do not insert shebang.js', async () => {
  const { code } = await build('no-shebang.js', { insert: false })
  equal('console.log();\n', code)
})

test('preserve shebang.js', async () => {
  const { code } = await build('shebang.js')
  equal('#!/usr/bin/node\nconsole.log();\n', code)
})

test('replace shebang.js', async () => {
  const { code } = await build('shebang.js', { preserve: false })
  equal('#!/usr/bin/env node\n\nconsole.log();\n', code)
})

test('does not create source map', async () => {
  const { map } = await build('no-shebang.js')
  ok(map === null)
})

test('create source map', async () => {
  const { map } = await build('no-shebang.js', {}, { sourcemap: true })
  ok(map !== null)
})

test('ignore file', async () => {
  const { code } = await build('no-shebang.mjs')
  equal('console.log();\n', code)
})

test('make output executable', async () => {
  const { mode } = await build('no-shebang.js', {}, 'executable')
  ok((mode & 0o755) === 0o755)
})

test('leave output not executable', async () => {
  const { mode } = await build('no-shebang.js', { executable: false }, 'not-executable')
  ok((mode & 0o755) !== 0o755)
})
