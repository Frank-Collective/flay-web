<template>
  <div v-if="page">
    <header class="header" data-st-animate_in_class>
      <div class="inner">
        <h1>Shop</h1>
        <img src="/images/Shop.svg" alt="" />
        <div class="cta">
          <span class="button primary">All Books Are Signed!</span>
        </div>
      </div>
    </header>
    <section class="grid-wrapper">
      <GridProducts />
    </section>
  </div>
</template>

<script>
import meta from '~/plugins/meta.js'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'
import GridProducts from '../../components/GridProducts.vue'
import scrollTriggerHub from '~/mixins/ScrollTriggerHub'

export default {
  mixins: [scrollTriggerHub],
  components: { GridProducts },
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: 127, idType: DATABASE_ID) {
          ${basics}
          seo {
            metaDesc
            title
            opengraphImage {
              sourceUrl
            }
          }
          ShopFields {
            products {
              ... on Product {
                ${basics}
                ${featured_image}
                CardLink {
                  cardLinkText
                }
                Descriptions {
                  featuredDescription
                  thumbnailDescription
                }
                ProductPrice {
                  productPrice
                }
              }
            }
          }
          isPreview
          preview {
            node {
              ${basics}
              ${featured_image}
            }
          }
        }
        viewer {
          name
          firstName
          nicename
        }        
      }
    `
    const { page, viewer } = await $graphql.default.request(query)
    console.log(page)
    // console.log(page, 'VIEWER: ', viewer)
    return { page }
  },
  head() {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo),
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 136px 0 80px;

  @include breakpoint(small) {
    flex-direction: column;
    margin: 66px 0 0;
    overflow: hidden;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5vw 0;

    @include breakpoint(small) {
      padding: 100px 0 70px;
    }

    h1 {
      @extend .h3;
      margin-bottom: 0;
      // Hide Text
      text-indent: -9999px;
      height: 1px;
      width: 1px;
      white-space: nowrap;
    }

    img {
      width: 100%;
      height: auto;
      opacity: 0;
      transform: translateY(-30px);
      transition: 3s transform, 1s opacity;

      @include breakpoint(small) {
        width: calc(100% + 50px);
        margin-bottom: 1.5em;
      }
    }

    .cta {
      position: absolute;
      right: 3vw;
      bottom: 0;
      user-select: none;
      opacity: 0;
      transform: translateY(30px);
      transition: 3s transform, 1s opacity;

      @include breakpoint(small) {
        position: relative;
        right: auto;
        bottom: auto;
      }

      .primary {
        font-size: 14px;
        font-weight: bold;
        background: $white;
        padding: 0.322em 0.7em;
      }
    }
  }

  &.animate-in {
    .inner {
      img {
        opacity: 1;
        transform: translateY(0);
      }

      .cta {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}

.grid-wrapper {
  position: relative;
  padding: 0 0 5px;
  width: calc(100% - 10px);
  left: 5px;

  @include breakpoint(small) {
    width: calc(100% - 20px);
    left: 10px;
  }
}
</style>
