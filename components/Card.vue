<template>
  <article class="card" v-bind:class="{ featured: featured }" v-on:click="$router.push({ path: `/portfolio/${data.slug}` })">
    <div href="#" class="inner">
      <div class="content">
        <div class="content-wrapper">
          <div class="pre-header">
            <span v-for="(cat, index) in data.categories.edges" :key="index">{{ cat.node.name }}</span>
          </div>
          <h4>{{ data.title }}</h4>
          <div class="image">
            <FadeImage
              v-if="data.featuredImage"
              :srcset="data.featuredImage.node.srcSet"
              :sizes="data.featuredImage.node.sizes"
              :src="data.featuredImage.node.mediaItemUrl"
              :alt="data.featuredImage.node.altText"
            />
          </div>
          <div v-html="data.content.substr(0, 100) + '...'"></div>
          <div class="cta">
            <nuxt-link :to="`/portfolio/${data.slug}`" class="button primary" v-if="data.CardLink.cardLinkText">{{
              data.CardLink.cardLinkText
            }}</nuxt-link>
          </div>
        </div>
      </div>
      <div class="featured-image" v-if="featured">
        <FadeImage
          v-if="data.featuredImage"
          :srcset="data.featuredImage.node.srcSet"
          :sizes="data.featuredImage.node.sizes"
          :src="data.featuredImage.node.mediaItemUrl"
          :alt="data.featuredImage.node.altText"
        />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    featured: Boolean,
    data: Object,
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
.card {
  position: relative;
  width: 33.333333%;
  flex-shrink: 0;
  padding: 5px;
  cursor: pointer;

  @include breakpoint(medium) {
    width: 50%;
  }

  @include breakpoint(small) {
    width: 100%;
    padding: 0 0 10px;
  }

  .inner {
    display: flex;
    height: 100%;
    min-height: 610px;

    @include breakpoint(small) {
      min-height: 465px;
    }

    &:hover {
      .content {
        .content-wrapper {
          .image {
            img {
              transform: translate(-10px, -10px);
              filter: grayscale(0%);
            }
          }

          .cta {
            .button {
              background: $white;
            }
          }
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      border: 1px solid $black;
      width: 100%;

      .content-wrapper {
        padding: 5vw;

        .pre-header {
          font-size: 14px;
          margin-bottom: 0.5em;
        }
        h4 {
          @include breakpoint(small) {
            margin-bottom: 1.3em;
          }
        }
        .image {
          position: relative;
          width: 100%;
          height: 208px;
          margin-bottom: 20px;

          @include breakpoint(small) {
            width: 210px;
            height: 155px;
            margin: 0 auto 20px;
          }

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 1px;
            right: 1px;
            border: 1px solid $black;
            z-index: 0;
          }

          img {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: translate(0px, 0px);
            filter: grayscale(100%);
            z-index: 1;
            transition: 0.5s transform, 1s filter linear;

            @include breakpoint(small) {
              transform: translate(-10px, -10px);
              filter: grayscale(0%);
              border: 1px solid $black;
            }
          }
        }
        /deep/ p {
          font-size: 14px;
        }
        .cta {
        }
      }
    }

    .featured-image {
      display: none;
      position: relative;
      flex-grow: 1;
      border: 1px solid $black;
      border-left: none;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &.featured {
    width: 100%;

    .content {
      width: calc(33.333333% + 3px);
      background-color: $grayish-orange !important;

      @include breakpoint(medium) {
        width: calc(50% + 3px);
      }

      @include breakpoint(small) {
        width: auto;
      }

      .content-wrapper {
        .pre-header {
          margin-bottom: 1.2em;
        }

        h4 {
          @extend .h3;

          @include breakpoint(small) {
            font-size: 20px;
          }
        }

        .image {
          display: none;

          @include breakpoint(small) {
            display: block;
          }
        }

        /deep/ p {
          font-size: 20px;
        }
      }
    }

    .featured-image {
      display: block;

      @include breakpoint(small) {
        display: none;
      }
    }
  }

  &:nth-of-type(9n + 1) {
    .content {
      background-color: $soft-pink;
    }
  }

  &:nth-of-type(9n + 2) {
    .content {
      background-color: $soft-orange;
    }
  }

  &:nth-of-type(9n + 3) {
    .content {
      background-color: $dark-grayish-violet;
    }
  }

  &:nth-of-type(9n + 4) {
    .content {
      background-color: $strong-red;
    }
  }

  &:nth-of-type(9n + 5) {
    .content {
      background-color: $dark-moderate-red;
    }
  }

  &:nth-of-type(9n + 6) {
    .content {
      background-color: $soft-violet;
    }
  }

  &:nth-of-type(9n + 7) {
    .content {
      background-color: $grayish-orange;
    }
  }

  &:nth-of-type(9n + 8) {
    .content {
      background-color: $soft-yellow;
    }
  }

  &:nth-of-type(9n + 9) {
    .content {
      background-color: $strong-orange;
    }
  }
}
</style>
