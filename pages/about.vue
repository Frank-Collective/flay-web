<template>
  <div v-if="page">
    <header class="about-header" data-st-animate_in_class>
      <div class="inner">
        <div class="image"><img :src="page.featuredImage.node.sourceUrl" alt="" /></div>
        <div class="content">
          <span class="big-letter" ref="bigLetter">{{ bigLetter }}</span>
          <div class="inner" v-html="page.content"></div>
        </div>
      </div>
      <div class="section-spacer"></div>
    </header>

    <PageBuilder :content_blocks="page.PageBuilder.contentBlocks" :type="'page'" />

    <Timeline v-if="page" :timelineData="page.TimelineFields" />

    <div class="section-spacer"></div>

    <SocialFeed />
  </div>
</template>

<script>
import meta from '~/plugins/meta.js'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'
import scrollTriggerHub from '~/mixins/ScrollTriggerHub'
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
  ${page_builder('Page')}
  TimelineFields {
    eventsFilters {
      name
      slug
    }
    defaultImage {
      ${image}
    }
    yearOfEvents {
      events {
        ... on Timeline {
          id
          title
          ${featured_image}
          ${categories}
        }
      }
      year
    }
  }
`
export default {
  data() {
    return {
      bigLetter: String,
      isPreviewContent: false,
    }
  },
  mixins: [scrollTriggerHub],
  async asyncData({ $graphql, route }) {
    const query = gql`
      query MyQuery {
        page(id: "about", idType: URI, asPreview: true) {
          ${gql_content}
          isPreview
          preview {
            node {
              ${gql_content}
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
    let { page, viewer } = await $graphql.default.request(query)
    console.log('ASYNCH DATA ROUTE route', route.query)
    console.log('ASYNCH DATA', page, viewer)
    if (route.query && route.query.preview && page.preview) {
      console.log('PREVIEW BRO')
      page = page.preview.node
    }
    return { page, viewer }
  },
  head() {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo),
      }
    }
  },
  mounted() {
    if (this.page) {
      this.bigLetter = this.page.content.substr(4, 1)
    }
  },
  validate({ params, query }) {
    console.log('validating...')
    if (query.preview) {
      console.log('Validating as preview')
    }
    return true
  },
  updated() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.about-header {
  padding: 43px 10px 0;
  opacity: 0;
  transition: 1s opacity;

  @include breakpoint(small) {
    padding: 43px 10px 0;
  }

  .inner {
    display: flex;
    flex-direction: column;

    .image {
      position: relative;
      width: 100%;
      height: 45vw;
      max-height: 650px;
      min-height: 162px;
      border: 1px solid $black;
      transform: translateY(-30px);
      transition: 3s transform;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    ::v-deep .content {
      position: relative;
      padding: 90px 6vw 0 33%;
      opacity: 0;
      transition: 3s opacity;

      @include breakpoint(small) {
        padding: 130px 6vw 0;
        text-align: center;
      }

      .big-letter {
        position: absolute;
        top: 0;
        left: 5vw;
        @extend .h1;
        line-height: 0.5em;
        opacity: 0;
        transform: translateX(50px);
        transition: 2s transform, 1s opacity;
        transition-delay: 0.25s;

        @include breakpoint(small) {
          top: 2vw;
          font-size: 150px;
        }
      }

      h1 {
        @extend .h3;
      }
    }
  }

  &.animate-in {
    opacity: 1;

    .image {
      transform: translateY(0px);
    }

    .content {
      opacity: 1;

      .big-letter {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }
}
</style>
