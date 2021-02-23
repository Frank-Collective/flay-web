<template>
  <article class="card">
    <nuxt-link to="/shop" class="inner">
      <div class="content" :style="{ background: bgColor }">
        <div class="content-wrapper">
          <h4>Bobby at Home: Fearless Flavors from My Kitchen</h4>
          <div class="image">
            <img src="/images/Bobby_at_Home-Cover.jpg" alt="" />
          </div>
          <p>
            This book is really personal to me. These are the recipes I cook for my friends and family.
          </p>
          <div class="price">$00.</div>
          <div class="cta">
            <nuxt-link to="/shop" class="button primary">Shop</nuxt-link>
          </div>
        </div>
      </div>
    </nuxt-link>
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
  width: 33.333333%;
  flex-shrink: 0;
  padding: 5px;

  @include breakpoint(medium) {
    width: 50%;
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
      width: 100%;

      .content-wrapper {
        padding: 5vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        h4 {
          @include breakpoint(small) {
            margin-bottom: 1.3em;
          }
        }

        .image {
          position: relative;
          width: 130px;
          height: auto;
          margin-bottom: 20px;

          @include breakpoint(small) {
            width: 92px;
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
            position: relative;
            display: block;
            width: 100%;
            height: auto;
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
        p {
          font-size: 14px;
        }
        .price {
          font-size: 14px;
          font-weight: bold;
          margin-top: 1em;
          margin-bottom: 2em;
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
}
</style>
