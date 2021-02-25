<template>
  <div class="portfolio-single-page">
    <BookHeader
      :image="'/images/Bobby_at_Home-Cover.jpg'"
      :price="'$00.'"
      :header="'Bobby at Home: Fearless Flavors from My Kitchen'"
      :content="'This book is really personal to me. These are the recipes I cook for my friends and family.'"
      :link="{ url: '#' }"
    />

    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer half mobile-only"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.portfolio-single-page {
}
</style>
