<template>
  <section class="carousel" v-if="data">
    <div class="inner">
      <div class="header" v-if="data.title">
        <nuxt-link :to="data.link.url" tabindex="0"
          ><h3>{{ data.title }}</h3></nuxt-link
        >
        <div class="cta" v-if="data.link">
          <nuxt-link class="button primary" :to="data.link.url" tabindex="0">{{ data.link.title }}</nuxt-link>
          <nuxt-link class="button secondary" :to="data.link.url" tabindex="0">{{ data.link.title }}</nuxt-link>
        </div>
      </div>

      <div class="slides-container">
        <flickity ref="flickity" :options="flickityOptions" class="slides">
          <div class="slide" v-for="(slide, index) in data.dailySpecialItems" :key="index">
            <div class="image">
              <FadeImage
                v-if="slide.featuredImage.node"
                :srcset="slide.featuredImage.node.srcSet"
                :sizes="slide.featuredImage.node.sizes"
                :src="slide.featuredImage.node.mediaItemUrl"
                :alt="slide.featuredImage.node.altText"
              />
            </div>
            <div class="content">
              <div class="pre-header">
                <span v-for="(cat, index) in slide.categories.edges" :key="index">{{ cat.node.name }}</span>
              </div>
              <h4>{{ slide.title }}</h4>
              <div v-html="slide.content"></div>
              <div class="cta">
                <nuxt-link :to="`/daily-specials/${slide.slug}`" class="button primary" v-if="slide.CardLink.cardLinkText">{{
                  slide.CardLink.cardLinkText
                }}</nuxt-link>
              </div>
            </div>
          </div>
        </flickity>
        <ol class="pagination">
          <li
            v-for="(slide, index) in data.dailySpecialItems"
            :key="index"
            v-on:click="select(index)"
            v-bind:class="{ selected: selectedIndex == index }"
          >
            {{ index + 1 }}
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
import Flickity from 'vue-flickity'

export default {
  components: {
    Flickity,
  },
  props: {
    data: null,
    headerText: null,
    headerLink: null,
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        autoPlay: 5000,
        adaptiveHeight: true,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.05,
        friction: 0.8,
      },
      selectedIndex: 0,
    }
  },
  computed: {},
  mounted() {
    console.log(this.data)
    if (this.$refs.flickity) {
      this.$refs.flickity.on('change', index => {
        // console.log('Selected Slide: ' + index)
        this.selectedIndex = index
      })
    }
  },
  methods: {
    select(index) {
      this.$refs.flickity.select(index)
      this.$refs.flickity.stopPlayer()
      this.$refs.flickity.playPlayer()
    },
    next() {
      this.$refs.flickity.next()
    },
    previous() {
      this.$refs.flickity.previous()
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  padding: 0 10px 15px;

  @include breakpoint(small) {
    padding: 0 0 70px;
    border-bottom: 1px solid $black;
  }

  .inner {
    display: flex;
    flex-direction: column;

    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3vw 40px;

      @include breakpoint(small) {
        flex-direction: column;
        margin: 66px 0 0;
        padding: 0 10px 40px;
      }

      h3 {
        margin-bottom: 0.3em;
      }

      .cta {
        .primary {
          display: none;

          @include breakpoint(small) {
            display: inline-block;
          }
        }
        .secondary {
          @include breakpoint(small) {
            display: none;
          }
        }
      }
    }

    .slides-container {
      position: relative;
      .slides {
        .slide {
          width: calc(100% + 1px);
          min-height: 610px;
          display: flex;

          @include breakpoint(medium) {
            min-height: 300px;
            height: unset;
          }

          @include breakpoint(small) {
            flex-direction: column;
            width: calc(100% - 20px);
            min-height: none;
            padding: 0 10px;
          }

          .image {
            position: relative;
            width: 66.666666%;
            flex-shrink: 0;
            border: 1px solid $black;
            margin-top: 10px;
            margin-right: 10px;

            @include breakpoint(medium) {
              width: 50%;
            }

            @include breakpoint(small) {
              width: auto;
              height: 59vw;
            }

            &:after {
              content: '';
              display: block;
              position: absolute;
              top: -10px;
              left: 10px;
              bottom: 10px;
              right: -10px;
              border: 1px solid $black;
              z-index: 0;

              @include breakpoint(small) {
                top: 10px;
                bottom: -10px;
              }
            }

            img {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 1;
            }
          }

          .content {
            padding: 0 55px;

            @include breakpoint(small) {
              text-align: center;
              padding: 60px 30px 0;
            }

            .pre-header {
              font-size: 14px;
              margin-bottom: 2em;
            }
            h4 {
              @extend .h3;
            }
            p {
            }
            .cta {
            }
          }
        }
      }

      ol.pagination {
        position: absolute;
        left: calc(66.666666% - 50px);
        transform: translate(-100%, -50%);
        background: $white;
        border: 1px solid $black;
        display: flex;
        padding: 0px 7px;

        @include breakpoint(medium) {
          left: calc(50% - 50px);
        }

        @include breakpoint(small) {
          left: 50%;
          transform: translate(-50%, calc(-50% + 13px));
          top: 59vw;
        }

        li {
          @include font-object-sans-regular;
          font-weight: bold;
          font-size: 14px;
          padding: 0.7em 0.8em 0.4em;
          cursor: pointer;

          &.selected {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
