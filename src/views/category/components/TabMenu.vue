<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div v-for="(item,index) in categories" :key="index">{{item.title}}</div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>

</style>