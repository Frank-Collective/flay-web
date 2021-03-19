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
      <div class="grid" id="instagram-feed"></div>
    </div>
  </section>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, link } from '~/gql/common'

export default {
  data() {
    return {
      socialmedias: null,
    }
  },
  mounted() {
    this.getInstaFeed()
  },
  updated() {
    this.getInstaFeed()
  },
  methods: {
    getInstaFeed() {
      new InstagramFeed({
        username: 'bobbyflay',
        container: document.getElementById('instagram-feed'),
        display_profile: false,
        display_biography: false,
        display_gallery: true,
        display_captions: false,
        callback: null,
        styling: false,
        items: 8,
        items_per_row: 4,
        margin: 1,
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
      ::v-deep .instagram_gallery {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 10px);
        left: -5px;

        a {
          position: relative;
          width: calc(25% - 10px);
          height: 381px;
          margin: 5px;
          border: 1px solid $black;
          box-sizing: border-box;

          @include breakpoint(maxlarge) {
            width: calc(25% - 10px);
            height: 23.87vw;
          }

          @include breakpoint(medium) {
            width: calc(33.333333% - 10px);
            height: 30.8vw;
          }

          @include breakpoint(small) {
            width: calc(50% - 10px);
            height: 47vw;
          }

          &.instagram-sidecar,
          &.instagram-video {
            &:before {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              width: 32px;
              height: 32px;
              background-image: url('/images/icon-insta-carousel.png');
              background-size: 100%;
              background-repeat: no-repeat;
              z-index: 1;
            }
          }

          &.instagram-video {
            &:before {
              background-image: url('/images/icon-insta-video.png');
            }
          }

          img {
            position: relative;
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
