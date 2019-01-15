import router from '../src/main'

const homePage = document.createElement('div')
const listPage = document.createElement('div')
const listFooterPage = document.createElement('div')
const detailPage = document.createElement('div')
const detailId = '123'
const errorPage = document.createElement('div')
const errorCode = '404'
const listLink = document.createElement('a')
const detailLink = document.createElement('a')
const clickEvent = new Event('click')

describe('path', () => {
  const path = router[0]
  const handler = path.handler

  it('测试 property 值', () => {
    expect(path.property).toBe('path')
  })

  describe('测试 handler', () => {
    it('首页', () => {
      handler(homePage, '/')
      expect(homePage.style.display).toBe('')
    })
    it('列表页', () => {
      handler(listPage, '/list')
      handler(listFooterPage, '/list')
      // 测试多次添加
      handler(listFooterPage, '/list')
      expect(listPage.style.display).toBe('none')
      expect(listFooterPage.style.display).toBe('none')
    })
    it('详情页', () => {
      handler(detailPage, {
        pathname: '/list/:id',
        watch: ({ params }) => {
          expect(params.id).toBe(detailId)
        }
      })
      expect(detailPage.style.display).toBe('none')
    })

    it('错误页', () => {
      handler(errorPage, {
        pathname: /.+/,
        watch: ({ params }) => {
          expect(params.code).toBe(errorCode)
        }
      })
      expect(errorPage.style.display).toBe('none')
    })
  })
})

describe('to', () => {
  const to = router[1]
  const handler = to.handler

  it('测试 property 值', () => {
    expect(to.property).toBe('to')
  })

  describe('测试 handler', () => {
    it('列表页', () => {
      handler(listLink, {
        pathname: '/list',
        replace: true
      })
      listLink.dispatchEvent(clickEvent)

      expect(homePage.style.display).toBe('none')
      expect(listPage.style.display).toBe('')
      expect(listFooterPage.style.display).toBe('')
      expect(detailPage.style.display).toBe('none')
      expect(errorPage.style.display).toBe('none')
    })
    it('详情页', () => {
      handler(detailLink, '/list/' + detailId)
      detailLink.dispatchEvent(clickEvent)

      expect(homePage.style.display).toBe('none')
      expect(listPage.style.display).toBe('none')
      expect(detailPage.style.display).toBe('')
      expect(errorPage.style.display).toBe('none')
    })
    it('错误页', () => {
      router.push({
        pathname: '/error',
        params: {
          code: errorCode
        }
      })

      expect(homePage.style.display).toBe('none')
      expect(listPage.style.display).toBe('none')
      expect(detailPage.style.display).toBe('none')
      expect(errorPage.style.display).toBe('')
    })
  })
})

// 随便调用一下
router.go(-1)
router.back()
router.forward()
router.currentLocation
const popstate = new Event('popstate')
window.dispatchEvent(popstate)

// 错误调用
it('测试错误Location', () => {
  try {
    new router.Location(123)
  } catch (e) {
    expect(e.message).toBeTruthy()
  }
})

