<template>
  <div class="contact-page" v-if="page">
    <PrimaryHeader
      :image="page.featuredImage != null ? page.featuredImage.node : null"
      :header="page.title"
      :content="page.content"
    />

    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer half mobile-only"></div>
  </div>
</template>

<script>
import meta from '~/plugins/meta.js'
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'
import scrollTriggerHub from '~/mixins/ScrollTriggerHub'

export default {
  mixins: [scrollTriggerHub],
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: "contact", idType: URI, asPreview: true) {
          ${basics}
          ${featured_image}
          seo {
            metaDesc
            title
            opengraphImage {
              sourceUrl
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
  head() {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo),
      }
    }
  },
  data() {
    return {}
  },
  mounted() {},
  updated() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
