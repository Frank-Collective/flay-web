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
export { basics, image, featured_image }
