<template>
  <div v-if="page">
    <header class="about-header">
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
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'

import gsap from 'gsap'

export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: "about", idType: URI, asPreview: true) {
          ${basics}
          ${featured_image}
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
          isPreview
          preview {
            node {
              ${basics}
              ${featured_image}
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
    const { page, viewer } = await $graphql.default.request(query)
    console.log(page)
    // console.log(page, 'VIEWER: ', viewer)
    return { page }
  },
  data() {
    return {
      bigLetter: String,
    }
  },
  mounted() {
    if (this.page) {
      this.bigLetter = this.page.content.substr(4, 1)
    }
  },
  updated() {},
  computed: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.about-header {
  padding: 43px 10px 0;

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

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    /deep/ .content {
      position: relative;
      padding: 90px 6vw 0 33%;

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
}
</style>
