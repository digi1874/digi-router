/**
 * 开发任务
 */
import { rollupConfig } from './config/rollup.config'

export default {
  ...rollupConfig,
  output: {
    ...rollupConfig.output,
    exports: 'named'
  }
}