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
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, categories, page_builder } from '~/gql/common'

export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query MyQuery {
        page(id: "contact", idType: URI, asPreview: true) {
          ${basics}
          ${featured_image}
          
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
    return {}
  },
  mounted() {},
  updated() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
