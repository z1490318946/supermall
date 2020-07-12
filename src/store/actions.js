import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";
export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payLoad.count = 1
        payLoad.checked = true
        context.commit(ADD_TO_CART, payLoad)
        resolve('添加商品到购物车')
      }
    })
  }
}