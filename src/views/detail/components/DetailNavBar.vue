<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
             class="title-item"
             :class="{active: currentIndex == index}"
             @click="titleClick(index)">
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      // 点击返回上一页
      backClick() {
        this.$router.back()
      },

      // 切换标签页
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index)
      }
    }
  }
</script>

<style scoped>

  .back img {
    padding-top: 10px;
  }

  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 15px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
