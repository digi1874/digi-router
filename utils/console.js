// 绿色格式
const success = '\x1b[32m%s\x1b[0m'
// 格式化console.log
export const successLog = (...msgs) => {
  let format = []
  for (const index in msgs) {
    format[index] = '%s'
  }
  format = success.replace('%s', format.join(', '))
  console.log(format, ...msgs)
}
