<template>
  <div class="grid" v-if="portfolioItems">
    <Card v-for="(card, index) in portfolioItems.edges" :key="index" :data="card.node" />
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'
import Grid from '~/components/Grid.vue'
export default {
  data() {
    return {
      portfolioItems: null,
    }
  },
  async fetch() {
    const query = gql`
      query PortfolioQuery {
        portfolioItems {
          edges {
            node {
              ${basics}
              ${featured_image}
              ${categories}
              CardLink {
                cardLinkText
              }
            }
          }
        }
      }
    `

    const { portfolioItems } = await this.$graphql.default.request(query)
    console.log('sadf', portfolioItems.edges[0])
    // console.log(portfolioItems.HomeFields.shop.products)
    this.portfolioItems = portfolioItems
    return { portfolioItems }
  },
}
</script>
<style lang="scss" scoped></style>
