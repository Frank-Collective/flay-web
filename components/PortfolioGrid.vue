<template>
  <div v-if="$fetchState.pending">Fetching posts...</div>
  <div v-else-if="$fetchState.error">Error while fetching posts</div>
  <div v-else>
    <div class="grid" v-if="portfolioItems">
      <Card v-for="(card, index) in portfolioItems" :key="index" :data="card.node" />
    </div>
    <div v-if="pageInfo.hasNextPage" class="loadmore" @click="fetchMore()"><h3>Load More</h3></div>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'

const ppp = 3
const query = gql`
  query PortfolioQuery(
      $first: Int
      $after: String
      $cat: String
    ){
    portfolioItems(first: $first, after: $after, where: {categoryName: $cat})  {
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
      pageInfo {
        endCursor
        hasNextPage
      }          
    }
  }
`

export default {
  props: {
    category: String,
  },
  data() {
    return {
      portfolioItems: null,
      pageInfo: null,
    }
  },
  watch: {
    category: function(newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$fetch()
    },
  },
  methods: {
    async fetchMore() {
      console.log('GIMMIE MORE', this.category)
      const variables = { first: ppp, after: this.pageInfo.endCursor, cat: this.category }
      const data = await this.$graphql.default.request(query, variables)
      console.log(data)
      this.portfolioItems = [...this.portfolioItems, ...data.portfolioItems.edges]
      this.pageInfo = data.portfolioItems.pageInfo
    },
  },
  async fetch() {
    console.log('FETCH', this.category)
    const variables = { first: ppp, after: null, cat: this.category }
    const data = await this.$graphql.default.request(query, variables)
    console.log(data)
    this.portfolioItems = data.portfolioItems.edges
    this.pageInfo = data.portfolioItems.pageInfo
  },
}
</script>
<style lang="scss" scoped>
.grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 10px);
  left: -5px;
  padding-bottom: 5px;

  @include breakpoint(small) {
    width: auto;
    left: auto;
  }
}
</style>
