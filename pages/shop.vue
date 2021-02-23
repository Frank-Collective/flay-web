<template>
  <div>
    <header class="header">
      <div class="inner">
        <h1>Shop</h1>
        <img src="/images/Shop.svg" alt="" />
        <div class="cta">
          <nuxt-link class="button primary" to="/shop" tabindex="0">All Books Are Signed!</nuxt-link>
        </div>
      </div>
    </header>

    <section class="grid">
      <div class="inner">
        <ProductCard :bgColor="'#80B0DE'" />
        <ProductCard :bgColor="'#84C698'" />
        <ProductCard :bgColor="'#C3FF4E'" />
        <ProductCard :bgColor="'#01FF58'" />
        <ProductCard :bgColor="'#BEBCA6'" />
        <ProductCard :bgColor="'#8597CB'" />
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 136px 0 80px;

  @include breakpoint(small) {
    flex-direction: column;
    margin: 66px 0 0;
    overflow: hidden;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5vw 0;

    @include breakpoint(small) {
      padding: 100px 0 70px;
    }

    h1 {
      @extend .h3;
      margin-bottom: 0;
      // Hide Text
      text-indent: -9999px;
      height: 1px;
      width: 1px;
      white-space: nowrap;
    }

    img {
      width: 100%;
      height: auto;

      @include breakpoint(small) {
        width: calc(100% + 50px);
        margin-bottom: 1.5em;
      }
    }

    .cta {
      position: absolute;
      right: 3vw;
      bottom: 0;

      @include breakpoint(small) {
        position: relative;
        right: auto;
        bottom: auto;
      }

      .primary {
        font-size: 14px;
        font-weight: bold;
        background: $white;
        padding: 0.322em 0.7em;
      }
    }
  }
}

.grid {
  position: relative;
  padding: 0 10px 5px;
  width: 100%;

  @include breakpoint(small) {
    padding: 0 10px;
  }

  .inner {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 10px);
    left: -5px;

    @include breakpoint(small) {
      left: auto;
      width: 100%;
    }
  }
}
</style>
