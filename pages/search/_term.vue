<template>
  <div v-if="$route.path" class="search-page">
    <h2>SEARCH</h2>
    <div class="grids">
      <grid-portfolio :searchTerm="$route.params.term" />
      <grid-products :searchTerm="$route.params.term" />
      <grid-daily-specials :searchTerm="$route.params.term" />
    </div>
  </div>
</template>

<script>
import GridDailySpecials from '../../components/GridDailySpecials.vue'
import GridPortfolio from '../../components/GridPortfolio.vue'
import GridProducts from '../../components/GridProducts.vue'
export default {
  components: { GridPortfolio, GridProducts, GridDailySpecials },
}
</script>

<style lang="scss">
.search-page {
  padding: 43px 10px 0;
  h4 {
  }
}
</style>
