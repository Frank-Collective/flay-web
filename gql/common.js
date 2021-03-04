const basics = `
  id
  title
  slug
  content
`
const image = `
  altText
  mediaDetails {
    height
    width
  }
  mediaItemUrl
  sourceUrl(size: LARGE)
  srcSet
`

const featured_image = `
featuredImage {
  node {
    ${image}
  }
}
`

const link = `
  target
  title
  url
`

const page_builder = type => {
  return `
  PageBuilder {
    contentBlocks {
      ... on ${type}_Pagebuilder_ContentBlocks_BoxedContent {
        fieldGroupName
        textEditor
      }
      ... on ${type}_Pagebuilder_ContentBlocks_ContentWLargeImageHeader {
        fieldGroupName
        image {
          ${image}
        }
        textEditor
      }
      ... on ${type}_Pagebuilder_ContentBlocks_Quote {
        fieldGroupName
        text
      }
      ... on ${type}_Pagebuilder_ContentBlocks_TextContent {
        fieldGroupName
        textEditor
      }
      ... on ${type}_Pagebuilder_ContentBlocks_Image {
        fieldGroupName
        image {
          ${image}
        }
      }
    }
  }
  `
}

export { basics, image, featured_image, link, page_builder }
