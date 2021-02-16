<template>
  <header class="primary-header">
    <div class="inner">
      <div class="image">
        <img v-if="image" :src="image" alt="" />
        <div class="big-letter" v-if="bigLetter">{{ bigLetter }}</div>
      </div>
      <div class="content">
        <h1 v-if="header">{{ header }}</h1>
        <p v-if="content">
          {{ content }}
        </p>
        <div class="cta" v-if="link">
          <nuxt-link class="button primary" :to="link.url" tabindex="0">{{ link.text }}</nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    image: null,
    bigLetter: null,
    header: null,
    content: null,
    link: null,
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.primary-header {
  padding: 0 10px;
  min-height: 100vh;
  overflow: hidden;

  @include breakpoint(medium) {
    border-bottom: 1px solid $black;
  }

  .inner {
    display: flex;
    height: 100%;
    padding-top: 44px;

    @include breakpoint(medium) {
      flex-direction: column;
      padding-top: 54px;
    }

    .image {
      position: relative;
      top: -1px;
      width: 50%;
      height: calc(100vh - 160px);
      flex-shrink: 0;
      border: 1px solid $black;
      box-sizing: border-box;

      @include breakpoint(medium) {
        width: calc(100% - 10px);
        height: 60vh;
        top: auto;
        left: 10px;
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 100%;
        height: 100%;
        border: 1px solid $black;
        z-index: 0;

        @include breakpoint(medium) {
          left: -10px;
        }
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        z-index: 1;

        @include breakpoint(medium) {
          // object-position: center;
        }
      }

      .big-letter {
        position: absolute;
        bottom: 30px;
        right: -40px;
        transform: translate(50%, 50%);
        @extend .h1;
        z-index: 2;

        @include breakpoint(medium) {
          bottom: 7px;
          right: 28px;
        }
      }
    }

    .content {
      width: 50%;
      padding: 9vw;

      @include breakpoint(medium) {
        width: auto;
        padding: 100px 30px 60px;
        text-align: center;
      }

      h1 {
        @extend .h3;
      }

      .cta {
        @include breakpoint(medium) {
          margin-top: 50px;
        }
      }
    }
  }
}
</style>
