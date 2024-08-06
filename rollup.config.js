export default {
  input: 'lib/index.js',
  output: { file: 'lib/index.cjs', format: 'cjs', sourcemap: true },
  external: ['@rollup/pluginutils', 'node:fs/promises', 'node:path', 'magic-string']
}
