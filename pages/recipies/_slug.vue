<template>
  <div class="portfolio-single-page">
    <PrimaryHeader
      :image="'/images/SpicedGreyhound1.jpg'"
      :preheader="'Recipes'"
      :header="'The Spiced Greyhound'"
      :content="
        'What makes this twist on the classic Greyhound cocktail special is the inclusion of a homemade spiced simple syrup.'
      "
      :link="{url: '#', title: 'A Link'}"
    />

    

    <div class="section-spacer hide-mobile"></div>
    <div class="section-spacer half mobile-only"></div>

    <article class="portfolio-content">
      <div class="inner">
        <!-- TODO: Set up flexible content ACF for these -->
        <div class="boxed-content">
          <h3>Makes two cocktails</h3>
          
          <p>
            Ginger Allspice Simple Syrup:
          </p>

          <p>
            <ul>
              <li>— 1 cup sugar</li>
              <li>— 1 teaspoon whole allspice berries</li>
              <li>— 2-inch piece fresh ginger, peeled and coarsely chopped</li>
            </ul>
          </p>

          <p>
            Combine the sugar, 1 cup water, allspice, and ginger in a small saucepan. Bring to a boil and cook until the sugar is
            completely melted. Remove from the heat and let steep for 30 minutes to 1 hour. Strain into a small bowl, cover and
            refrigerate until cold, about 1 hour.
          </p>
        </div>

        <div class="section-spacer"></div>
        <div class="section-spacer mobile-only"></div>

        <figure class="image">
          <img src="/images/SpicedGreyhound1.jpg" alt="">
        </figure>

        <blockquote>
          <p>I could easily live in Italy. I love the people, the language, their approach to lifestyle—and of course the food.</p>
        </blockquote>

        <div class="section-spacer half"></div>
        
        <div class="regular-content">
          <p>Cocktail:
            <ul>
              <li>— 1 grapefruit, segmented and pith removed</li>
              <li>— 1 lime, cut into wedges</li>
              <li>— 1 ounce Ginger Allspice Simple Syrup, recipe above</li>
              <li>— 4 ounces vodka</li>
              <li>— 2 ounces fresh lime juice</li>
              <li>— Cold Club Soda</li>
            </ul>
          </p>
          <p>1. Muddle the grapefruit segments and lime wedges in the bottom of a cocktail shaker with a muddler or the end of a wooden spoon. </p>
          <p>2. Add the vodka, lime juice and simple syrup and fill it three quarters of the way full with ice. Stir and taste for balance. Add more simple syrup as needed. Shake until it is very cold, then evenly divide between two cocktail glasses filled with ice. </p>
          <p>3. Top with sparkling water to taste. Garnish with a sliced grapefruit and serve immediately. </p>
        </div>

        <div class="section-spacer"></div>
        
      </div>
    </article>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { basics, image, featured_image, link } from '~/gql/common'
export default {

  async asyncData({ $graphql, params }) {
    console.log(params)
    const $uri = `recipies/${params.slug}`
    console.log($uri)

    const query = gql`
      query PostQuery ($uri: ID!) {
        post(id: $uri, idType: SLUG) {
          id
          content
          title
        }
      }
    `

    const { page } = await $graphql.default.request(query)
    // console.log(page)
    // console.log('DID WE GET IT????')
    // return { page }
  },
}
</script>

<style lang="scss" scoped>
.portfolio-single-page {

  .portfolio-content {
  
    .inner {
      display: flex;
      flex-direction: column;
  
      .image {
        width: 100%;
        max-width: 810px;
        margin: 0 auto;
        padding: 0 10px;
  
        img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid $black;
        }
      }
  
      blockquote {
        display: flex;
        width: 100%;
        max-width: 1035px;
        margin: 60px auto;
        padding: 0 10px;
  
        @include breakpoint(medium) {
          flex-direction: column;
        }
  
        &:before {
          content: '';
          position: relative;
          display: block;
          flex-shrink: 0;
          width: 244px;
          height: 197px;
          background-image: url('/images/quotes.png');
          background-size: 100%;
          background-repeat: no-repeat;
  
          @include breakpoint(medium) {
            left: -37px;
            width: 172px;
            height: 139px;
          }
        }
  
        p {
          @extend .h3;
          margin: 1.7em 0 0 70px;
  
          @include breakpoint(medium) {
            margin: 1.3em 0 0 0;
            text-align: center;
          }
        }
      }
  
      .regular-content {
        width: 100%;
        max-width: 810px;
        margin: 0 auto;
        padding: 0 10px;
  
        @include breakpoint(small) {
          text-align: center;
        }
      }
    }
  }
}
</style>
