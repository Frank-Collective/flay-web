<template>
  <footer class="footer">
    <div class="inner">
      <div class="navs">
        <ul class="main">
          <li><nuxt-link to="/about" tabindex="0">About</nuxt-link></li>
          <li><nuxt-link to="/portfolio" tabindex="0">The Portfolio</nuxt-link></li>
          <li><nuxt-link to="/shop" tabindex="0">Shop</nuxt-link></li>
          <li><nuxt-link to="/daily-special" tabindex="0">Daily Special</nuxt-link></li>
          <li><nuxt-link to="/contact" tabindex="0">Contact</nuxt-link></li>
        </ul>
        <ul class="socialmedia" v-if="socialmedias">
          <li v-for="(socialmedia, index) in socialmedias" :key="index">
            <a :href="socialmedia.link" target="_blank">{{ socialmedia.title }}</a>
          </li>
        </ul>
      </div>
      <div class="copyright">&#169; Bobby Flay</div>
    </div>
  </footer>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'

export default {
  data() {
    return {
      socialmedias: null,
    }
  },
  async fetch() {
    const query = gql`
      query MyQuery {
        globalContent {
          SocialLinksFields {
            socialMediaIconLink {
              title
              icon {
                ${image}
              }
              link
            }
          }
        }
      }
    `
    const data = await this.$graphql.default.request(query)
    this.socialmedias = data.globalContent.SocialLinksFields.socialMediaIconLink
  },
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 10px 10px;

  .inner {
    border: 1px solid $black;
    display: flex;
    justify-content: space-between;
    padding: 5vw 6vw;

    @include breakpoint(small) {
      flex-direction: column;
      padding: 30px;
    }

    .navs {
      display: flex;

      @include breakpoint(small) {
        margin-bottom: 130px;
      }

      @include breakpoint(tiny) {
        // justify-content: space-between;
      }

      ul {
        &.main {
          margin-right: 8vw;

          @include breakpoint(small) {
            margin-right: 100px;
          }
        }

        li {
          font-family: 'Object-Sans-Regular';
          font-weight: bold;
          font-size: 14px;
          line-height: 1;
          margin-bottom: 1em;

          &:last-of-type {
            margin-bottom: 0;
          }

          a {
            text-decoration: none;
            color: black;
          }
        }
      }
    }

    .copyright {
      font-family: 'Object-Sans-Regular';
      font-weight: bold;
      font-size: 14px;
      line-height: 1;
    }
  }
}
</style>
