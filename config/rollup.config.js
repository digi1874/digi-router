import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'

export const DICT = {
  NPM_DIR: 'npm_package',     // 此文件夹存放的文件用于发布到npm
  OUTPUT_NAME: 'digi-router', // 打包后的文件名
  OUTPUT_DIR: 'dist',         // 此文件存放打包后的文件
  INPUT_FILENAME: 'main.js'   // 入口文件
}

// rollup 基础配置
export const rollupConfig = {
  input: path.join('src', DICT.INPUT_FILENAME),
  output: {
    file: path.join(DICT.OUTPUT_DIR, DICT.OUTPUT_NAME + '.js'),
    format: 'cjs',
    name: DICT.OUTPUT_NAME
  },
  plugins: [
    // babel 必需优先
    babel(),
    eslint(),
    resolve(),
    commonjs()
  ]
}
