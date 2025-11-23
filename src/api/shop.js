/**
 * Mocking client-server processing
 */
const _products = [
  { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 200000 },
  { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
  { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]

export default {
  //provider(_products) with callback, execute callback function :cb
  getProducts1 (cb) {
    setTimeout(() => {
      cb(_products)
      console.log('商品加载完成')
    }, 1000)
  },
  // pure provider, not consume
  getProducts2 () {
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(_products)
        console.log('商品加载完成')
      }, 1000)
    })
  },
  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
        ? cb()
        : errorCb()
    }, 100)
  }
}
