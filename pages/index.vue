<template>
  <div v-if="page">
    <PrimaryHeader
      :image="
        page.PrimaryHeader.image != null ? page.PrimaryHeader.image : page.featuredImage != null ? page.featuredImage.node : null
      "
      :bigLetter="page.PrimaryHeader.bigLetter"
      :preheader="page.PrimaryHeader.preHeader"
      :header="page.PrimaryHeader.header"
      :content="page.PrimaryHeader.content"
      :link="page.PrimaryHeader.link"
    />

    <section
      class="portfolio"
      v-if="page.HomeFields.portfolio.portfolioItems.length"
      data-st-slide_up_enter
      data-st-slide_up_leave
    >
      <div class="inner">
        <div class="header">
          <h3 v-if="page.HomeFields.portfolio.title">
            <nuxt-link v-if="page.HomeFields.portfolio.link" :to="page.HomeFields.portfolio.link.url" tabindex="0">{{
              page.HomeFields.portfolio.title
            }}</nuxt-link>
            <div v-else>{{ page.HomeFields.portfolio.title }}</div>
          </h3>
          <div class="cta" v-if="page.HomeFields.portfolio.link">
            <nuxt-link class="button primary" :to="page.HomeFields.portfolio.link.url" tabindex="0">{{
              page.HomeFields.portfolio.link.title
            }}</nuxt-link>
            <nuxt-link class="button secondary" :to="page.HomeFields.portfolio.link.url" tabindex="0">{{
              page.HomeFields.portfolio.link.title
            }}</nuxt-link>
          </div>
        </div>
        <div class="grid" v-if="page.HomeFields.portfolio.firstIsFeatured" data-st-stagger_cards_slide_up_enter>
          <div class="featured-wrapper">
            <Card :featured="true" :data="page.HomeFields.portfolio.portfolioItems[0]" :directory="'/portfolio/'" />
          </div>
          <Card
            v-for="(card, index) in page.HomeFields.portfolio.portfolioItems.slice(1)"
            :key="index"
            :data="card"
            :directory="'/portfolio/'"
          />
        </div>
        <div class="grid" v-else>
          <Card
            v-for="(card, index) in page.HomeFields.portfolio.portfolioItems"
            :key="index"
            :data="card"
            :directory="'/portfolio/'"
          />
        </div>
      </div>
    </section>

    <client-only>
      <Carousel
        :data="page.HomeFields.dailySpecial"
        :headerText="'Daily Special'"
        :headerLink="{ text: 'View All', url: '/daily-special' }"
      />
    </client-only>

    <section class="shop" data-st-slide_up_enter data-st-slide_up_leave>
      <div class="inner">
        <div class="header">
          <nuxt-link to="/shop" tabindex="0"
            ><h3><img src="/images/Shop.svg" alt="" /></h3
          ></nuxt-link>
          <div class="cta">
            <nuxt-link class="button primary" to="/shop" tabindex="0">Shop All</nuxt-link>
            <nuxt-link class="button secondary" to="/shop" tabindex="0">Shop All</nuxt-link>
          </div>
        </div>
        <div class="grid" data-st-stagger_cards_slide_up_enter>
          <ProductCard v-for="(card, index) in page.HomeFields.shop.products" :key="index" :data="card" />
        </div>
      </div>
    </section>

    <SocialFeed />
  </div>
  <div v-else>wtf</div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'
import scrollTriggerHub from '~/mixins/ScrollTriggerHub'

export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: "home", idType: URI, asPreview: true) {
          ${basics}
          ${featured_image}
          PrimaryHeader {
            image {
              ${image}
            }
            bigLetter
            preHeader
            header
            content
            link {
              ${link}
            }
          }
          HomeFields {
            portfolio {
              title
              link {
                ${link}
              }
              portfolioItems {
                ... on Portfolio {
                  ${basics}
                  ${featured_image}
                  ${categories}
                  CardLink {
                    cardLinkText
                  }
                }
              }
              firstIsFeatured
            }
            dailySpecial {
              title
              link {
                ${link}
              }
              dailySpecialItems {
                ... on DailySpecial {
                  ${basics}
                  ${featured_image}
                  ${categories}
                  CardLink {
                    cardLinkText
                  }
                }
              }
            }
            shop {
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
          }
        }
      }
    `

    const { page } = await $graphql.default.request(query)
    // console.log(page)
    return { page }
  },
  mixins: [scrollTriggerHub],
  data() {
    return {}
  },
  mounted() {
    // console.log('homepage: mounted')
  },
  updated() {
    // console.log('homepage: updated')
  },
  methods: {},
  watch: {
    $route(to, from) {
      console.log(to, from)
      if (to.name == 'index') {
        console.log('returning to homepage')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.portfolio {
  padding: 20px 10px 100px;

  @include breakpoint(small) {
    padding-bottom: 0;
  }

  .inner {
    display: flex;
    flex-direction: column;

    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3vw;
      margin: 66px 0 0;

      @include breakpoint(small) {
        flex-direction: column;
        margin: 66px 0;
      }

      h3 {
        margin-bottom: 0.3em;
      }

      .cta {
        .primary {
          display: none;

          @include breakpoint(small) {
            display: inline-block;
          }
        }
        .secondary {
          @include breakpoint(small) {
            display: none;
          }
        }
      }
    }

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

      .featured-wrapper {
        width: 100%;
      }
    }
  }
}

.shop {
  padding: 0 10px;

  @include breakpoint(small) {
    padding: 0;
  }

  .inner {
    display: flex;
    flex-direction: column;

    .header {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5vw;
      margin: 66px 0 66px;

      @include breakpoint(medium) {
        margin-bottom: 30px;
      }

      @include breakpoint(small) {
        flex-direction: column;
        margin: 66px 0;
        padding: 0;
        overflow: hidden;
      }

      h3 {
        margin-bottom: 0;

        @include breakpoint(small) {
          width: calc(100% + 50px);
          margin-bottom: 0.5em;
        }

        img {
          width: 100%;
          height: auto;
        }
      }

      .cta {
        position: absolute;
        right: 3vw;
        bottom: 0;

        @include breakpoint(small) {
          position: relative;
          right: auto;
          bottom: auto;
        }

        .primary {
          display: none;

          @include breakpoint(small) {
            display: inline-block;
          }
        }
        .secondary {
          @include breakpoint(small) {
            display: none;
          }
        }
      }
    }

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
        padding: 0 10px;
      }
    }
  }
}
</style>
