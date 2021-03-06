<template>
  <div v-if="page">
    <header class="featured">
      <div class="inner">
        <article class="portfolio-piece" v-for="(data, index) in page.PortfolioFields.featuredPortfolioItems" :key="index">
          <div class="image">
            <FadeImage
              v-if="data.featuredImage"
              :srcset="data.featuredImage.node.srcSet"
              :sizes="data.featuredImage.node.sizes"
              :src="data.featuredImage.node.mediaItemUrl"
              :alt="data.featuredImage.node.altText"
            />
            <span class="number">{{ index + 1 }}</span>
          </div>
          <div class="content">
            <h3>{{ data.title }}</h3>
            <div v-html="`${data.content.substr(0, 100)}...`"></div>
            <div class="cta">
              <nuxt-link :to="`/portfolio/${data.slug}`" class="button primary" v-if="data.CardLink.cardLinkText">{{
                data.CardLink.cardLinkText
              }}</nuxt-link>
            </div>
          </div>
        </article>
      </div>
    </header>
    <section class="portfolio-grid">
      <div class="inner">
        <div class="filters">
          <ul v-bind:class="{ open: filtersOpen }">
            <li
              @click="
                () => {
                  selectedFilter = null
                }
              "
            >
              All
            </li>
            <li
              v-for="(data, index) in page.PortfolioFields.portfolioFilters"
              :key="index"
              @click="
                () => {
                  selectedFilter = data.slug
                }
              "
            >
              {{ data.name }}
            </li>
          </ul>
          <div class="toggler">
            <span>All</span>
            <div class="toggle-btn" v-on:click="toggleFiltersMenu">
              <div></div>
              <div v-bind:style="{ opacity: filtersOpen ? '0' : '1' }"></div>
            </div>
          </div>
        </div>
        <GridPortfolio :category="selectedFilter" />
      </div>
    </section>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'
import GridPortfolio from '~/components/GridPortfolio.vue'

export default {
  components: { GridPortfolio },
  data() {
    return {
      filtersOpen: false,
      selectedFilter: null,
    }
  },
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
    },
  },
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: 31, idType: DATABASE_ID) {
          ${basics}
          ${featured_image}
          PortfolioFields {
            featuredPortfolioItems {
              ... on Portfolio {
                ${basics}
                ${featured_image}
                ${categories}
                CardLink {
                  cardLinkText
                }
              }
            }
            portfolioFilters {
              name
              slug
            }
          }
        }
      }
    `

    const { page } = await $graphql.default.request(query)
    return { page }
  },
}
</script>

<style lang="scss" scoped>
.featured {
  padding: 44px 10px 0;
  overflow: hidden;

  .inner {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0;

    article.portfolio-piece {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

      @include breakpoint(small) {
        flex-direction: column;
      }

      .image {
        position: relative;
        width: 67%;
        flex-shrink: 0;
        border: 1px solid $black;
        box-sizing: border-box;

        @include breakpoint(small) {
          width: 100%;
        }

        img {
          display: block;
          width: 100%;
          height: auto;
        }

        .number {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(40%, -0.15em);
          @extend .h1;
          line-height: 0;

          @include breakpoint(small) {
            right: auto;
            top: 100%;
            transform: translate(-0.15em, -0.05em);
          }
        }
      }

      .content {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px 3vw 30px 7vw;

        @include breakpoint(medium) {
          padding: 30px 25px 30px 7vw;
        }

        @include breakpoint(small) {
          padding: 60px 0 50px;
          align-items: center;
          text-align: center;

          h3 {
            margin-bottom: 0.3em;
          }
        }
      }

      &:nth-of-type(even) {
        .image {
          order: 1;

          @include breakpoint(small) {
            order: unset;
          }

          .number {
            top: 50%;
            right: auto;
            left: 0;
            transform: translate(-40%, -0.55em);

            @include breakpoint(small) {
              left: auto;
              right: 0;
              top: 100%;
              transform: translate(40%, -0.1em);
            }
          }
        }

        .content {
          padding: 30px 5vw 30px 6vw;

          @include breakpoint(medium) {
            padding: 30px 5vw 30px 25px;
          }

          @include breakpoint(small) {
            padding: 60px 0 50px;
          }

          h3 {
            padding-right: 5vw;
          }
        }
      }
    }
  }
}

.portfolio-grid {
  padding: 0 10px;

  @include breakpoint(small) {
    padding-bottom: 0;
  }

  .inner {
    display: flex;
    flex-direction: column;
  }
}
</style>
