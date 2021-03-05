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

    <div class="about-timeline">
      <div class="inner">
        <div class="filters">
          <ul v-bind:class="{ open: filtersOpen }">
            <li>All</li>
            <li v-for="(data, index) in page.TimelineFields.eventsFilters" :key="index" :data-filter="data.slug">
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

        <div class="timeline">
          <div class="images">
            <template v-for="data in page.TimelineFields.yearOfEvents">
              <template v-for="event in data.events">
                <img
                  v-if="event.featuredImage != null"
                  :key="event.id"
                  :src="event.featuredImage.node.mediaItemUrl"
                  alt=""
                  v-bind:class="{ visible: event.id == rolloverImageID }"
                />
              </template>
            </template>
          </div>
          <div class="content black-scrollbar">
            <ol>
              <template v-for="data in page.TimelineFields.yearOfEvents">
                <li
                  v-for="event in data.events"
                  :key="event.id"
                  :data-filters="makeCatString(event.categories.edges)"
                  v-on:mouseover="showImage(event)"
                >
                  <span class="date">{{ data.year }}</span>
                  {{ event.title }}
                </li>
              </template>
            </ol>
          </div>
        </div>
      </div>
    </div>

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
      filtersOpen: false,
      bigLetter: String,
      eventsImages: Array,
      rolloverImageID: null,
    }
  },
  mounted() {
    if (this.page) {
      this.bigLetter = this.page.content.substr(4, 1)
    }
  },
  updated() {},
  computed: {},
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
    },
    makeCatString(cats) {
      let str = ''
      for (let cat in cats) {
        str += `${cats[cat].node.slug} `
      }
      return str
    },
    showImage(event) {
      if (event.featuredImage != null) {
        this.rolloverImageID = event.id
      }
    },
  },
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

.page-builder {
}

.about-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;

  .inner {
    margin: 0 25px;
    width: 100%;
    max-width: 915px;

    .timeline {
      display: flex;
      justify-content: space-between;
      height: 548px;
      margin-top: 35px;

      @include breakpoint(small) {
        margin-top: -5px;
        height: auto;
      }

      .images {
        position: relative;
        border: 1px solid $black;
        width: calc(50% - 5px);
        flex-shrink: 0;

        @include breakpoint(small) {
          display: none;
        }

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: 0.25s opacity;

          &.visible {
            opacity: 1;
          }
        }
      }

      .content {
        border: 1px solid $black;
        width: calc(50% - 5px);
        flex-shrink: 0;
        padding: 50px;

        @include breakpoint(small) {
          width: 100%;
          border-top: 0;
          overflow-y: visible;
          padding: 40px;
        }

        ol {
          li {
            font-size: 30px;
            line-height: 1;
            margin-bottom: 1em;
            cursor: pointer;

            span {
              display: block;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 0.5em;
              pointer-events: none;
            }
          }
        }
      }
    }
  }
}
</style>
