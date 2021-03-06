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
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, link, page_builder } from '~/gql/common'
export default {
  async asyncData({ $graphql, params }) {
    const post_uri = params.slug

    const query = gql`
      query PostQuery ($uri: ID!) {
        product(id: $uri, idType: URI) {
          ${basics}
          ${featured_image} 
          ProductPrice {
            productPrice
          }  
        }
      }
    `
    const variables = { uri: post_uri }

    const { product } = await $graphql.default.request(query, variables)
    console.log(product)
    return { product }
  },
}
</script>

<style lang="scss" scoped>
.product-single-page {
}
</style>
