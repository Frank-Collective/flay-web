<template>
  <div v-if="page">
    <header class="header" data-st-animate_in_class>
      <div class="inner">
        <h1><span>Daily</span><span>Special</span></h1>
      </div>
    </header>

    <section class="grid-wrap">
      <div class="filters" data-st-fade_up>
        <ul v-bind:class="{ open: filtersOpen }">
          <li
            @click="
              () => {
                selectedFilter = { slug: null, name: null }
                closeFiltersMenu()
              }
            "
            v-bind:class="{ active: selectedFilter.slug == null }"
          >
            All
          </li>
          <li
            v-for="(data, index) in page.DailySpecialFields.dailySpecialFilters"
            :key="index"
            @click="
              () => {
                selectedFilter = data
                closeFiltersMenu()
              }
            "
            v-bind:class="{ active: selectedFilter.slug == data.slug }"
          >
            {{ data.name }}
          </li>
        </ul>
        <div class="toggler">
          <span v-html="selectedFilter.name == null ? 'All' : selectedFilter.name">All</span>
          <div class="toggle-btn" v-on:click="toggleFiltersMenu">
            <div></div>
            <div v-bind:style="{ opacity: filtersOpen ? '0' : '1' }"></div>
          </div>
        </div>
      </div>
      <GridDailySpecials :category="selectedFilter.slug" data-st-fade_up />
    </section>
  </div>
</template>

<script>
import meta from '~/plugins/meta.js'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'
import GridDailySpecials from '~/components/GridDailySpecials'
import scrollTriggerHub from '~/mixins/ScrollTriggerHub'

export default {
  mixins: [scrollTriggerHub],
  components: { GridDailySpecials },

  data() {
    return {
      filtersOpen: false,
      selectedFilter: { slug: null, name: null },
    }
  },
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
    },
    closeFiltersMenu() {
      this.filtersOpen = false
    },
  },
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: 30, idType: DATABASE_ID) {
          ${basics}
          ${featured_image}
          seo {
            metaDesc
            title
            opengraphImage {
              sourceUrl
            }
          }
          DailySpecialFields {
            dailySpecialFilters {
              name
              slug
            }
          }
        }
      }
    `

    const { page } = await $graphql.default.request(query)
    console.log(page)
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
  margin: 110px 0 40px;

  @include breakpoint(small) {
    flex-direction: column;
    margin: 126px 0 100px;
    overflow: hidden;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5vw;
    width: 100%;

    @include breakpoint(small) {
      padding: 0 10px;
    }

    h1 {
      @extend .h2;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      width: 100%;

      @include breakpoint(small) {
        align-items: center;
      }

      span {
        margin-bottom: 0.2em;
        opacity: 0;
        transform: translateY(-30px);
        transition: 3s transform, 1s opacity;

        @include breakpoint(small) {
          margin-bottom: 0em;
        }

        &:nth-of-type(2) {
          align-self: flex-end;
          transform: translateY(30px);

          @include breakpoint(small) {
            align-self: unset;
          }
        }
      }
    }
  }

  &.animate-in {
    .inner {
      h1 {
        span {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}

.grid-wrap {
  position: relative;
  padding: 0 10px 5px;
  width: 100%;

  @include breakpoint(small) {
    padding: 0 10px;
  }

  .grid {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 10px);
    left: -5px;

    @include breakpoint(small) {
      left: auto;
      width: 100%;
      padding-top: 5px;
    }
  }
}
</style>
