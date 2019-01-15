import router from '../src/main'

it('测试页面移除', () => {
  const page = document.createElement('div')
  const id = '123'

  router[0].handler(page, {
    pathname: '/remove/:id',
    watch: ({ params }) => {
      expect(params.id).toBe(id)
    }
  })

  expect(page.style.display).toBe('none')

  router.push('/remove/' + id)
  expect(page.style.display).toBe('')

  // 多次触发不影响
  page.remove()

  // 页面移除后，watch不会再触发
  router.push({
    pathname: '/remove/8888',
    search: '?t=1',
    params: { a: 1 },
  })

  page.remove()

  router.push('/')
  // 页面移除后，页面显示或隐藏不会再更改
  expect(page.style.display).toBe('')
})
