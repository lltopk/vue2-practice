export function getData() {
  // 使用setTimeout模拟异步获取数据（1s 后返回对象）, 且不阻塞主线程
  return new Promise((resolve) => {
    console.log('payload 开始加载')
    setTimeout(() => {
        resolve({ amount: 1 , async: false})
        console.log('payload 加载完成')
    }, 1000)
  })
}