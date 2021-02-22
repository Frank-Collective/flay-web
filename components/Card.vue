<template>
  <article class="card" v-bind:class="{ featured: featured }">
    <a href="#" class="inner">
      <div class="content" :style="{ background: bgColor }">
        <div class="content-wrapper">
          <div class="pre-header">Restaurants</div>
          <h4>Amalfi</h4>
          <div class="image">
            <img src="/images/amalfi_ba_lounge.jpg" alt="" />
          </div>
          <p>
            I’m really excited to bring the flavors and feel of coastal Italy to Caesars Palace. It’s a complete experience—you’re
            gonna love it.
          </p>
          <div class="cta">
            <a href="#" class="button primary">Coming Soon</a>
          </div>
        </div>
      </div>
      <div class="featured-image" v-if="featured">
        <img src="/images/amalfi_ba_lounge.jpg" alt="" />
      </div>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    featured: Boolean,
    bgColor: { type: String, default: '#f4c2db' }, // defaults to $soft-pink
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
  width: calc(33.333333% - 10px);
  flex-shrink: 0;
  padding: 5px;

  @include breakpoint(medium) {
    width: calc(50% - 10px);
  }

  @include breakpoint(small) {
    width: 100%;
    padding: 0 0 10px;

    // &:nth-of-type(n + 4) {
    //   display: none;
    // }
  }

  .inner {
    display: flex;
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
            }
          }
        }
        p {
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
    width: calc(100% - 10px);

    @include breakpoint(small) {
      width: 100%;
    }

    .content {
      width: calc(33.333333% + 3px);

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

        p {
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
}
</style>
