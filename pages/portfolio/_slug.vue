<template>
  <div v-if="portfolio" class="portfolio-single-page">
    <PrimaryHeader
      :image="portfolio.featuredImage != null ? portfolio.featuredImage.node : null"
      :preheader="'Portfolio'"
      :header="portfolio.title"
      :content="portfolio.content"
      :link="portfolio.HeaderCTALink.link != null ? portfolio.HeaderCTALink.link : null"
    />

    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer half mobile-only"></div>

    <PageBuilder :content_blocks="portfolio.PageBuilder.contentBlocks" :type="'Portfolio'" />
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
        portfolio(id: $uri, idType: URI) {
          ${basics}
          ${featured_image} 
          ${page_builder('Portfolio')}
          HeaderCTALink {
            link {
              target
              title
              url
            }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }  
        }
      }
    `
    const variables = { uri: post_uri }

    const { portfolio } = await $graphql.default.request(query, variables)
    console.log(portfolio)
    return { portfolio }
  },
}
</script>

<style lang="scss" scoped>
.portfolio-single-page {
  .portfolio-content {
    .inner {
      display: flex;
      flex-direction: column;

      .image {
        width: 100%;
        max-width: 810px;
        margin: 0 auto;
        padding: 0 10px;

        img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid $black;
        }
      }

      blockquote {
        display: flex;
        width: 100%;
        max-width: 1035px;
        margin: 60px auto;
        padding: 0 10px;

        @include breakpoint(medium) {
          flex-direction: column;
        }

        &:before {
          content: '';
          position: relative;
          display: block;
          flex-shrink: 0;
          width: 244px;
          height: 197px;
          background-image: url('/images/quotes.png');
          background-size: 100%;
          background-repeat: no-repeat;

          @include breakpoint(medium) {
            left: -37px;
            width: 172px;
            height: 139px;
          }
        }

        p {
          @extend .h3;
          margin: 1.7em 0 0 70px;

          @include breakpoint(medium) {
            margin: 1.3em 0 0 0;
            text-align: center;
          }
        }
      }

      .regular-content {
        width: 100%;
        max-width: 810px;
        margin: 0 auto;
        padding: 0 10px;

        @include breakpoint(small) {
          text-align: center;
        }
      }
    }
  }
}
</style>
