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

    <PageBuilder :content_blocks="page.PageBuilder.contentBlocks" />

    <div class="about-timeline">
      <div class="inner">
        <div class="filters">
          <ul v-bind:class="{ open: filtersOpen }">
            <li>All</li>
            <li>Restaurants</li>
            <li>TV</li>
            <li>Cookbooks</li>
            <li>Distinctions</li>
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
            <img src="/images/BeatBobbyFlay2.jpg" alt="" />
          </div>
          <div class="content black-scrollbar">
            <ol>
              <li>
                <span class="date">1991</span>
                Mesa Grill Opens in New York City
              </li>
              <li>
                <span class="date">1993</span>
                Bolo Opens in New York City
              </li>
              <li>
                <span class="date">1996</span>
                Mesa City Opens
              </li>
              <li>
                <span class="date">1999</span>
                Mesa Grill Opens in New York City
              </li>
              <li>
                <span class="date">2001</span>
                Mesa Grill Opens in New York City
              </li>
              <li>
                <span class="date">1991</span>
                Mesa Grill Opens in New York City
              </li>
              <li>
                <span class="date">1993</span>
                Bolo Opens in New York City
              </li>
              <li>
                <span class="date">1996</span>
                Mesa City Opens
              </li>
              <li>
                <span class="date">1999</span>
                Mesa Grill Opens in New York City
              </li>
              <li>
                <span class="date">2001</span>
                Mesa Grill Opens in New York City
              </li>
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
import { basics, image, featured_image, page_builder } from '~/gql/common'

import gsap from 'gsap'

export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: "about", idType: URI, asPreview: true) {
          ${basics}
          ${featured_image}
          ${page_builder}
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
    // console.log('DID WE GET IT????')
    return { page }
  },
  data() {
    return {
      filtersOpen: false,
      bigLetter: null,
    }
  },
  mounted() {
    if (this.page) {
      this.bigLetter = this.page.content.substr(4, 1)

      // gsap.to(this.$refs.bigLetter, 1, { x: 100 })
    }
  },
  updated() {},
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
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
            }
          }
        }
      }
    }
  }
}
</style>
