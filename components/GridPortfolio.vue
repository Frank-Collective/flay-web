<template>
  <div>
    <div class="fetch-message fetching" v-if="$fetchState.pending">Loading...</div>
    <div class="fetch-message error" v-if="$fetchState.error">Error while fetching posts</div>
    <h4 v-if="searchTerm">
      <span v-if="!portfolioItems || portfolioItems.length <= 0">No</span> Portfolio Results for "{{ searchTerm }}"
    </h4>
    <div class="grid" v-if="portfolioItems && portfolioItems.length">
      <Card v-for="(card, index) in portfolioItems" :key="index" :data="card.node" :directory="'/portfolio/'" />
    </div>
    <div class="fetch-message" v-else-if="!searchTerm">No results</div>
    <div v-if="pageInfo && pageInfo.hasNextPage" class="loadmore">
      <div class="button primary" @click="fetchMore()">
        <span>Load More</span>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'

const ppp = 9
const query = gql`
  query PortfolioQuery(
      $first: Int
      $after: String
      $cat: String
      $term: String
    ){
    portfolioItems(first: $first, after: $after, where: {categoryName: $cat, search: $term})  {
      edges {
        node {
          ${basics}
          ${featured_image}
          ${categories}
          CardLink {
            cardLinkText
          }
          Descriptions {
            featuredDescription
            thumbnailDescription
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
    category: {
      type: String,
      default: null,
    },
    searchTerm: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      portfolioItems: null,
      pageInfo: null,
    }
  },
  watch: {
    category: function(newVal, oldVal) {
      this.$fetch()
    },
    searchTerm: function(newVal, oldVal) {
      this.$fetch()
    },
  },
  methods: {
    async fetchMore() {
      const variables = { first: ppp, after: this.pageInfo.endCursor, cat: this.category, term: this.searchTerm }
      const data = await this.$graphql.default.request(query, variables)
      console.log(data)
      this.portfolioItems = [...this.portfolioItems, ...data.portfolioItems.edges]
      this.pageInfo = data.portfolioItems.pageInfo
    },
  },
  async fetch() {
    const variables = { first: ppp, after: null, cat: this.category, term: this.searchTerm }
    const data = await this.$graphql.default.request(query, variables)
    this.portfolioItems = data.portfolioItems.edges
    this.pageInfo = data.portfolioItems.pageInfo
  },
}
</script>
<style lang="scss" scoped>
h4 {
  margin-top: 1em;
  //border-top: 1px solid $black;
  padding-top: 1em;
}
.grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 10px);
  left: -5px;
  padding-bottom: 5px;
  min-height: 500px;
  @include breakpoint(small) {
    width: auto;
    left: auto;
  }
}
.fetch-message {
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadmore {
  padding: 5em;
  display: flex;
  justify-content: center;
  .button {
    cursor: pointer;
  }
}
</style>
