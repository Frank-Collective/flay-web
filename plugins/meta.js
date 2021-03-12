const meta = function(data) {
  const output = []
  output.push(
    { hid: 'author', name: 'author', content: 'Bobby Flay' },
    { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'Bobby Flay' },
    { hid: 'og:site_name', name: 'og:site_name', content: 'Bobby Flay' },
    { hid: 'theme-color', name: 'theme-color', content: '#F8F5EE' }
  )
  if (data.metaDesc) {
    output.push(
      { hid: 'description', name: 'description', content: data.metaDesc },
      { hid: 'og:description', name: 'og:description', content: data.metaDesc }
    )
  }
  if (data.title) {
    output.push({ hid: 'og:title', name: 'og:title', content: data.title })
  }

  if (data.opengraphImage && data.opengraphImage.sourceUrl) {
    output.push({ hid: 'og:image', name: 'og:image', content: data.opengraphImage.sourceUrl })
  }
  return output
}

export default meta
