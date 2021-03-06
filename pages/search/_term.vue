<template>
  <div v-if="$route.path" class="search-page">
    <h2>SEARCH</h2>
    <div class="grids">
      <h3>Portfolio Results for: {{ $route.params.term }}</h3>
      <grid-portfolio :searchTerm="$route.params.term" />
      <h3>Shop Results for: {{ $route.params.term }}</h3>
      <grid-products :searchTerm="$route.params.term" />
      <h3>Daily Special Results for: {{ $route.params.term }}</h3>
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

<style lang="scss" scoped>
.search-page {
  padding: 43px 10px 0;
  .grids {
    h3 {
      margin-top: 2em;
    }
  }
}
</style>
