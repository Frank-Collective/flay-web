<template>
  <div v-if="page">
    <header class="header">
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
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'
import GridProducts from '../../components/GridProducts.vue'

export default {
  components: { GridProducts },
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: 127, idType: DATABASE_ID) {
          ${basics}
          ShopFields {
            products {
              ... on Product {
                ${basics}
                ${featured_image}
                CardLink {
                  cardLinkText
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
}

.grid-wrapper {
  position: relative;
  padding: 0 10px 5px;
  width: 100%;

  @include breakpoint(small) {
    padding: 0 10px;
  }
}
</style>
