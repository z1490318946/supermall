<template>
  <div id="category">
		<nav-bar class="category-nav">
			<div slot="center">商品分类</div>
		</nav-bar>
		<div class="content">
			<tab-menu :categories="categories"></tab-menu>

		</div>
	</div>
</template>

<script>
	import Scroll from "components/common/scroll/Scroll";
	import NavBar from 'components/common/navbar/NavBar'

	import TabMenu from "./components/TabMenu"

	export default {
		name: "Category",
		components: {
			NavBar,
			Scroll,

			TabMenu
		},
		data() {
			return {
				categories: []
			}
		},
		
		
};
</script>

<style scoped>

	.category-nav {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>