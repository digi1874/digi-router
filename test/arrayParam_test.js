import router from '../src/main'

it('测试数组参数', () => {
  const arrayPage = document.createElement('div')
  const ids = ['123', '2']

  router[0].handler(arrayPage, {
    pathname: '/arrayPage',
    watch: ({ params }) => {
      ids.forEach(id => {
        expect(params.id.indexOf(id) !== -1).toBe(true)
      })
    }
  })
  expect(arrayPage.style.display).toBe('none')
  router.push('/arrayPage?id=123&id=2&id=3')
  expect(arrayPage.style.display).toBe('')
  router.push('/')
  expect(arrayPage.style.display).toBe('none')
})
