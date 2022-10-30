export default {
  input: 'lib/index.js',
  output: { file: 'lib/index.cjs', format: 'cjs', sourcemap: true },
  external: ['@rollup/pluginutils', 'fs/promises', 'path', 'magic-string']
}
