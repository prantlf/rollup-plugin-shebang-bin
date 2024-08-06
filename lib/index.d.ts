import type { Plugin } from 'rollup'

interface ShebangOptions {
  /**
   * All JavaScript files will be checked by default,
   * but you can also specifically include files.
   * @default ['** / *.js']
   */
  include?: string | RegExp | ReadonlyArray<string | RegExp> | null

  /**
   * All JavaScript files will be checked by default,
   * but you can also specifically exclude files.
   */
  exclude?: string | RegExp | ReadonlyArray<string | RegExp> | null

  /**
   * Detect existing shebang.
   * @default /^\s*#!.*\n* /
   */
  regexp?: RegExp

  /**
   * Target shebang to enforce.
   * @default '#!/usr/bin/env node'
   */
  shebang?: string

  /**
   * Separator between the enforced shebang and the rest of the contents.
   * @default '\n\n'
   */
  separator?: string

  /**
   * Executable mode for the files after enforcing the shebang to them.
   * @default 0o755
   */
  mode?: number

  /**
   * If the shebang should be inserted.
   * @default true
   */
  insert?: boolean

  /**
   * If the existing shebang should be preserved.
   * @default true
   */
  preserve?: boolean

  /**
   * If the updated file should have its executable mode ensured.
   * @default true
   */
  executable?: boolean
}

/**
* Preserves or inserts shebang (hashbang) to scripts and makes them executable.
 */
export default function shebang (options?: ShebangOptions): Plugin
