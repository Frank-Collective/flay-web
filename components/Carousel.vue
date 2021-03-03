<template>
  <section class="carousel">
    <div class="inner">
      <div class="header" v-if="headerText">
        <nuxt-link :to="headerLink.url" tabindex="0"
          ><h3>{{ headerText }}</h3></nuxt-link
        >
        <div class="cta" v-if="headerLink">
          <nuxt-link class="button primary" :to="headerLink.url" tabindex="0">{{ headerLink.text }}</nuxt-link>
          <nuxt-link class="button secondary" :to="headerLink.url" tabindex="0">{{ headerLink.text }}</nuxt-link>
        </div>
      </div>

      <div class="slides-container">
        <flickity ref="flickity" :options="flickityOptions" class="slides">
          <div class="slide" v-for="(slide, index) in slides" :key="index">
            <div class="image">
              <img :src="slide.image" alt="" />
            </div>
            <div class="content">
              <div class="pre-header">{{ slide.preheader }}</div>
              <h4>{{ slide.header }}</h4>
              <p>{{ slide.text }}</p>
              <div class="cta">
                <nuxt-link class="button primary" :to="slide.link.url" tabindex="0">{{ slide.link.text }}</nuxt-link>
              </div>
            </div>
          </div>
        </flickity>
        <ol class="pagination">
          <li
            v-for="(slide, index) in slides"
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
    headerText: null,
    headerLink: null,
  },
  data() {
    return {
      slides: [
        {
          preheader: 'Recipes',
          header: 'The Spiced Greyhound',
          text: 'Join Bobby in the kitchen to make his new favorite cocktail inspired by seasonal produce from Misfits Market.',
          link: {
            text: "Let's Drink",
            url: '/daily-special',
          },
          image: '/images/SpicedGreyhound1.jpg',
        },
        {
          preheader: 'Slide 2',
          header: 'Slide 2 Title',
          text: "The traditions of classic steakhouse fare, with New Jersey's fresh produce flare.",
          link: {
            text: 'Go!',
            url: '/daily-special',
          },
          image: '/images/SpicedGreyhound1.jpg',
        },
        {
          preheader: 'Slide 3',
          header: 'Slide 3 Title',
          text: "The traditions of classic steakhouse fare, with New Jersey's fresh produce flare.",
          link: {
            text: 'Go NOW!',
            url: '/daily-special',
          },
          image: '/images/SpicedGreyhound1.jpg',
        },
      ],
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        autoPlay: 5000,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.05,
        friction: 0.8,
      },
      selectedIndex: 0,
    }
  },
  computed: {},
  mounted() {
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
