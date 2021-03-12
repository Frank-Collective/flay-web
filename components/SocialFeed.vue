<template>
  <section class="social-feed" data-st-fade_up>
    <div class="inner">
      <div class="header">
        <h3>@</h3>
        <ul class="social-icons" v-if="socialmedias">
          <li v-for="(socialmedia, index) in socialmedias" :key="index">
            <a :href="socialmedia.link" target="_blank">
              <img :src="socialmedia.icon.mediaItemUrl" :alt="socialmedia.title" />
            </a>
          </li>
        </ul>
      </div>
      <div class="grid" v-if="instafeed">
        <div class="card" v-for="(data, index) in instafeed" :key="index">
          <div class="image"><img :src="data.media_url" :alt="data.caption" /></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'

export default {
  data() {
    return {
      insta_token:
        'IGQVJVRTd6WlljcmV6ZA1I4QWRRQVFFLTRZANG1sTW5qVDctWEFuazY0QV9saS1GMjBHWURWVnVORUl4U3FHZATRHdjBVcGdENWU3SURxMl9JdThEZAGkxLWROaGhQV3JPdXgtUmZAhSUx2U0VWYWtSYWpPcAZDZD',
      instafeed: null,
      socialmedias: null,
    }
  },
  mounted() {},
  created() {
    this.getInstaFeed()
  },
  methods: {
    getInstaFeed() {
      axios
        .get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_insta_token=${this.insta_token}`)
        .then(response => {
          this.instafeed = response.data.data
          // console.log(response)
        })
    },
  },
  async fetch() {
    const query = gql`
      query MyQuery {
        globalContent {
          SocialLinksFields {
            socialMediaIconLink {
              title
              icon {
                ${image}
              }
              link
            }
          }
        }
      }
    `
    const data = await this.$graphql.default.request(query)
    // console.log(data.globalContent.SocialLinksFields.socialMediaIconLink)
    this.socialmedias = data.globalContent.SocialLinksFields.socialMediaIconLink
  },
}
</script>

<style lang="scss" scoped>
.social-feed {
  padding: 0 10px 5px;

  .inner {
    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 9vw;

      @include breakpoint(small) {
        padding-top: 50px;
      }

      h3 {
        position: relative;
        z-index: 1;
        left: 8vw;
        @include font-maelstrom;
        font-size: 490px;
        line-height: 0.33;
        margin: 0;
        user-select: none;
        pointer-events: none;

        @include breakpoint(xlarge) {
          font-size: 34vw;
        }

        @include breakpoint(small) {
          font-size: 290px;
          left: -60px;
        }
      }

      ul.social-icons {
        display: flex;
        align-items: center;
        margin: 0 6vw 40px;

        @include breakpoint(small) {
          margin: 0 0 40px;
          position: absolute;
          right: -10px;
        }

        li {
          margin: 0 20px;
          a {
            display: block;

            &:hover {
              svg {
                top: -3px;
              }
            }

            svg {
              position: relative;
              top: 0;
              pointer-events: none;
              transition: 0.25s top;
            }
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

      .card {
        width: 25%;
        height: 381px;
        padding: 5px;

        @include breakpoint(maxlarge) {
          width: 25%;
          height: 23.87vw;
        }

        @include breakpoint(medium) {
          width: 33.333333;
          height: 30.8vw;
        }

        @include breakpoint(small) {
          width: 50%;
          height: 47vw;
        }

        .image {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid $black;
          box-sizing: border-box;

          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
