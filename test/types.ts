import shebang from 'rollup-plugin-shebang-bin'

declare type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  shebang()
  shebang({})
  shebang({ include: [] })
  shebang({ include: [''] })
  shebang({ include: '' })
  shebang({ include: /a/ })
  shebang({ exclude: [] })
  shebang({ exclude: [''] })
  shebang({ exclude: '' })
  shebang({ exclude: /a/ })
  shebang({ regexp: /a/ })
  shebang({ shebang: '' })
  shebang({ separator: '' })
  shebang({ mode: 0 })
  shebang({ insert: true })
  shebang({ preserve: true })
  shebang({ executable: true })
})
