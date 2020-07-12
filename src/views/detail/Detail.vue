<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./components/DetailNavBar";
import DetailSwiper from "./components/DetailSwiper";
import DetailBaseInfo from "./components/DetailBaseInfo";
import DetailShopInfo from "./components/DetailShopInfo";
import DetailParamInfo from "./components/DetailParamInfo";
import DetailGoodsInfo from "./components/DetailGoodsInfo";
import DetailCommentInfo from "./components/DetailCommentInfo";
import DetailRecommendInfo from "./components/DetailRecommendInfo";
import DetailBottomBar from "./components/DetailBottomBar";

import { mapActions } from 'vuex';

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

import { itemListenerMixin, backTopMiXin} from "common/mixin";
import { debounce } from "common/utils";
import {BACK_POSITION} from "common/const";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMiXin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.id;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取顶部的轮播图片
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取商品详情数据
      this.detailInfo = data.detailInfo;

      // 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 保存评价信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
        console.log(this.commentInfo);
      }
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    }),
      // 4.给getThemeTopY赋值
      (this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      }));
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听屏幕滚动
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for(let i = 0; i < length; i++){
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY
        < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > BACK_POSITION
    },

    // 将商品加入到购物车
    addToCart() {
      // 1.获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.newPrice = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品添加到购物车
      this.addCart(product).then(res => {
        this.$toast.show(res, 1500)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
    }
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 99px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
