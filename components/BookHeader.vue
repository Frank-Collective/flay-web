<template>
  <div>
    <div class="section-spacer"></div>
    <div class="section-spacer half"></div>
    <header class="book-header">
      <div class="inner">
        <figure class="image">
          <FadeImage
            v-if="image"
            :srcset="image.node.srcSet"
            :sizes="image.node.sizes"
            :src="image.node.mediaItemUrl"
            :alt="image.node.altText"
          />
          <div class="message">All Books Are Signed!</div>
        </figure>
        <div class="content">
          <div class="price" v-if="price">${{ price }}</div>
          <h1 v-if="header">{{ header }}</h1>
          <div v-if="content" v-html="content"></div>
          <p>All books are autographed by Bobby prior to shipping.</p>
          <form class="form">
            <div class="form_inner">
              <input type="text" placeholder="Request a personalized inscription here" />
              <button type="submit">Submit</button>
            </div>
            <span>Please limit to 1-sentence</span>
          </form>
          <div class="cta" v-if="link">
            <a class="button primary" :href="link.url" target="_blank" tabindex="0"
              >Buy now with <img src="/images/logo-paypal.svg" alt=""
            /></a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    image: null,
    bigLetter: null,
    price: null,
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
.book-header {
  padding: 0 10px;
  // min-height: 100vh;
  overflow: hidden;

  @include breakpoint(medium) {
    min-height: none;
  }

  .inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    padding: 44px 8vw 0;

    @include breakpoint(medium) {
      flex-direction: column;
      align-items: center;
      padding: 54px 0 0;
    }

    .image {
      position: relative;
      width: 41%;
      flex-shrink: 0;

      @include breakpoint(large) {
        width: 45%;
      }

      @include breakpoint(medium) {
        width: 65vw;
        min-width: 241px;
      }

      img {
        position: relative;
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid $black;
      }

      .message {
        position: absolute;
        top: 60px;
        right: 0;
        transform: translateX(50%);
        border: 1px solid $black;
        background: $white;
        font-size: 14px;
        padding: 0.7em 0.7em 0.5em;
        user-select: none;
        text-align: center;

        @include breakpoint(large) {
          top: 100%;
          right: 50%;
          transform: translate(50%, -50%);
        }
      }
    }

    .content {
      width: 41%;
      flex-shrink: 0;

      @include breakpoint(large) {
        width: 45%;
      }

      @include breakpoint(medium) {
        width: auto;
        padding: 100px 25px 60px;
        text-align: center;
      }

      @include breakpoint(small) {
        padding: 70px 25px 60px;
      }

      .price {
        font-size: 14px;
        margin-bottom: 2.5em;
        font-weight: bold;
      }

      h1 {
        @extend .h3;
      }

      .form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 30px;

        @include breakpoint(medium) {
          margin-top: 70px;
        }

        .form_inner {
          padding: 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid $black;
          padding-bottom: 15px;
          margin-bottom: 10px;

          @include breakpoint(small) {
            flex-direction: column;
            align-items: flex-start;
            border-bottom: none;
            margin-bottom: 0;
          }

          input {
            font-size: 14px;
            color: $black;
            border: none;
            outline: none;
            background: transparent;
            appearance: none;
            border-radius: 0;

            @include breakpoint(small) {
              font-size: 15px;
              width: 100%;
              border-bottom: 1px solid $black;
              padding-bottom: 0.6em;
            }

            &::placeholder {
              font-size: 14px;
              color: #c1c1c1;
            }
          }

          button {
            font-size: 20px;
            border: none;
            outline: none;
            background: transparent;
            appearance: none;
            padding: 0;

            @include breakpoint(small) {
              font-size: 15px;
              margin-top: 10px;
            }
          }
        }

        span {
          text-align: right;
          font-size: 14px;
          color: #c1c1c1;
          pointer-events: none;

          @include breakpoint(small) {
            position: relative;
            transform: translateY(calc(-200% - 3px));
          }
        }
      }

      .cta {
        .button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          padding-left: 10px;
          padding-right: 10px;

          @include breakpoint(small) {
            font-weight: bold;
          }

          img {
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
