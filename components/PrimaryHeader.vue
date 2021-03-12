<template>
  <header class="primary-header" data-st-primary_header>
    <div class="inner">
      <figure class="image">
        <FadeImage
          v-if="image"
          :srcset="image.srcSet"
          :sizes="image.sizes"
          :src="image.mediaItemUrl"
          :alt="image.altText"
          :width="image.mediaDetails.width"
          :height="image.mediaDetails.height"
        />
        <figcaption class="big-letter" v-if="bigLetter">{{ bigLetter }}</figcaption>
        <figcaption class="big-letter" v-else>{{ getBigLetter }}</figcaption>
      </figure>
      <div class="content">
        <div class="preheader" v-if="preheader">{{ preheader }}</div>
        <h1 v-if="header">{{ header }}</h1>
        <div v-if="content" v-html="content" class="text"></div>
        <div class="cta" v-if="link">
          <a v-if="link.target != ''" class="button primary" :href="link.url" tabindex="0" :target="link.target">{{
            link.title
          }}</a>
          <nuxt-link v-else class="button primary" :to="link.url" tabindex="0">{{ link.title }}</nuxt-link>
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
    preheader: null,
    header: null,
    content: null,
    link: null,
  },
  data() {
    return {}
  },
  computed: {
    getBigLetter() {
      if (this.bigLetter == null) {
        return this.header.substr(0, 1)
      }
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.primary-header {
  padding: 0 10px;
  min-height: 100vh;
  overflow: hidden;
  opacity: 0;

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
      margin: 0;
      transform: translateX(100px);
      // transition: 3s transform;

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
      }

      .big-letter {
        position: absolute;
        bottom: 30px;
        right: 0;
        @extend .h1;
        z-index: 2;
        pointer-events: none;
        transform: translate(0%, 50%);
        // opacity: 0;
        // transition: 2s transform, 1s opacity;
        // transition-delay: 0.25s;

        @include breakpoint(medium) {
          bottom: 7px;
          right: 28px;
        }
      }
    }

    .content {
      width: 50%;
      padding: 9vw;
      // transform: translateY(100px);
      // opacity: 0;
      // transition: 3s transform, 1s opacity;
      // transition-delay: 0.5s;

      @include breakpoint(medium) {
        width: auto;
        padding: 100px 30px 60px;
        text-align: center;
        .text {
          text-align: center;
        }
      }

      @include breakpoint(small) {
        padding: 70px 30px 60px;
        text-align: center;
      }

      .preheader {
        font-size: 14px;
        margin-bottom: 2.5em;
      }

      /deep/ h1,
      h2 {
        @extend .h3;
      }

      /deep/ p {
        a {
          text-decoration: underline;
        }
      }

      .cta {
        @include breakpoint(medium) {
          margin-top: 50px;
        }
      }
    }
  }

  &.animate-in {
    opacity: 1;

    .image {
      transform: translateX(0px);

      .big-letter {
        transform: translate(40%, 50%);
        opacity: 1;
      }
    }

    .content {
      transform: translateY(0px);
      opacity: 1;
    }
  }
}

.portfolio-single-page,
.contact-page {
  .primary-header {
    .inner {
      .image {
        @include breakpoint(medium) {
          left: 0px;
        }
        &:after {
          @include breakpoint(medium) {
            left: 10px;
          }
        }
        .big-letter {
          @include breakpoint(medium) {
            bottom: auto;
            right: auto;
            top: 50%;
            left: -15px;
            transform: none;
          }
        }
      }
    }
  }
}
</style>
