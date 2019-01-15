[![Build Status](https://travis-ci.org/digi1874/digi-router.svg?branch=master)](https://travis-ci.org/digi1874/digi-router)
[![codecov](https://codecov.io/gh/digi1874/digi-router/branch/master/graph/badge.svg)](https://codecov.io/gh/digi1874/digi-router)

# digi-router

### [digi](https://github.com/digi1874/digi)

## 使用
```
yarn add -D digi digi-router
```

### 简单例子
```
import digi from 'digi'
import router from 'digi-router'

digi.plugins([ ...router ])

digi([
  { to: '/',     text: '首页' },
  { to: '/list', text: '列表页' },
  {
    path: '/',
    child: { text: '首页内容' }
  },
  {
    path: '/list'
    child: [
      { to: '/list/1', text: '详情页1' },
      { to: '/list/2', text: '详情页2' }
    ]
  },
  {
    path: { pathname: '/list/:id', watch: ({ params }) => console.log(params) // => { id: 1 } },
    text: '详情页内容'
  },
  {
    path: /.+/,
    text: '404页面放在最后'
  }
])

```
