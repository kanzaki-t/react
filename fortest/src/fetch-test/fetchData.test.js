
// import { render, screen } from '@testing-library/react';

// 如果需要拿到页面上的元素，需要引用组件
// import Hello from './components/Hello'
import { fetchData } from './fetchData'

describe('my testing',() => {

  test('fetch方法测试', (done) => {
    fetchData((data) => {
      expect(data).toEqual({
        success: true
      })
      done()
    })
    
  });
  
})

