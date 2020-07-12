<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkCount}})</span>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.newPrice * item.count;
        }, 0)
        .toFixed(2);
    },

    // 计算选中商品的数量
    checkCount() {
      return this.cartList.filter(item => item.checked).length;
    },

    // 是否全部选中
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return !this.cartList.filter(item => !item.checked).length;
      }
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      console.log("点击了去结算");
      // if (!isSelectAll()) {
      //   this.$toast.show("请至少选择一件商品", 1500);
      // }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>