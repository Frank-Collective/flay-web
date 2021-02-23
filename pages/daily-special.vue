<template>
  <div>
    <header class="header">
      <div class="inner">
        <h1><span>Daily</span><span>Special</span></h1>
      </div>
    </header>

    <section class="grid">
      <div class="filters">
        <ul v-bind:class="{ open: filtersOpen }">
          <li>All</li>
          <li>Recipes</li>
          <li>Restaurants</li>
          <li>TV</li>
          <li>Ventures</li>
        </ul>
        <div class="toggler">
          <span>All</span>
          <div class="toggle-btn" v-on:click="toggleFiltersMenu">
            <div></div>
            <div v-bind:style="{ opacity: filtersOpen ? '0' : '1' }"></div>
          </div>
        </div>
      </div>
      <div class="inner">
        <Card :bgColor="'#80B0DE'" />
        <Card :bgColor="'#84C698'" />
        <Card :bgColor="'#C3FF4E'" />
        <Card :bgColor="'#01FF58'" />
        <Card :bgColor="'#BEBCA6'" />
        <Card :bgColor="'#8597CB'" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtersOpen: false,
    }
  },
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 110px 0 40px;

  @include breakpoint(small) {
    flex-direction: column;
    margin: 126px 0 100px;
    overflow: hidden;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5vw;
    width: 100%;

    @include breakpoint(small) {
      padding: 0 10px;
    }
  }

  h1 {
    @extend .h2;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;

    @include breakpoint(small) {
      align-items: center;
    }

    span {
      margin-bottom: 0.2em;

      @include breakpoint(small) {
        margin-bottom: 0em;
      }

      &:nth-of-type(2) {
        align-self: flex-end;

        @include breakpoint(small) {
          align-self: unset;
        }
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
      padding-top: 5px;
    }
  }
}
</style>
