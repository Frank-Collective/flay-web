<template>
  <div class="product-single-page" v-if="product">
    <BookHeader
      :image="product.featuredImage"
      :price="`${product.ProductPrice.productPrice}`"
      :header="product.title"
      :content="product.content"
      :link="{ url: '#' }"
    />

    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer half mobile-only"></div>
  </div>
</template>

<script>
import meta from '~/plugins/meta.js'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, link, page_builder } from '~/gql/common'
const gql_content = `
  ${basics}
  ${featured_image} 
  seo {
    metaDesc
    title
    opengraphImage {
      sourceUrl
    }
  }
  ProductPrice {
    productPrice
  } 
`
export default {
  async asyncData({ $graphql, route }) {
    const post_uri = route.params.slug

    const query = gql`
      query PostQuery ($uri: ID!) {
        product(id: $uri, idType: URI) {
          ${gql_content}
          preview {
            node {
              ${gql_content}
            }
          }           
        }
      }
    `
    const variables = { uri: post_uri }
    let { product } = await $graphql.default.request(query, variables)
    if (route.query && route.query.preview && product.preview) {
      product = product.preview.node
    }
    return { product }
  },
  head() {
    if (this.product && this.product.seo) {
      return {
        title: this.product.seo.title,
        meta: meta(this.product.seo),
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.product-single-page {
}
</style>
