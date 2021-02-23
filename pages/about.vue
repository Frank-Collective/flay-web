<template>
  <div>
    <header class="about-header">
      <div class="inner">
        <div class="image"><img src="/images/BobbysBurgerPalace-1208.jpg" alt="" /></div>
        <div class="content">
          <h1 data-first-letter="F">Food is the center of my universe</h1>
          <p>
            First and foremost, my most comfortable place is in my kitchens—at my restaurants or at home. I don an apron (my
            shield from the tough moments of the world) on it are remnants of my creations—both good and somewhat experimental. It
            reminds me that I’m not afraid to fail as long as I make every effort to succeed.
          </p>
        </div>
      </div>
    </header>
    <div class="section-spacer"></div>
    <section class="about-content">
      <article class="boxed-content">
        <h3>As a chef, I wake up thinking about food</h3>
        <p>
          How will I utilize it that day? Sourcing a new flour to make a fresh, stuffed pasta at my Italian restaurant, Amalfi?
          Zesting a citrus fruit I picked up at the Farmer’s market? Working on a new Chile-flecked mayo to slather on a fried
          chicken sandwich at my burger spot? It’s moments like these that make me realize how lucky I am. I get to start each and
          every day doing something I love, something I cherish. It’s how I work. It’s how I live my life.
        </p>
      </article>
      <div class="section-spacer"></div>
      <article>
        <figure>
          <div class="image">
            <img src="/images/160125_BORGATA_BobbyFlaySteak57160.jpg" alt="" />
          </div>
          <figcaption>I</figcaption>
        </figure>
        <div class="section-spacer"></div>
        <div class="content">
          <h3>I took an unconventional path</h3>
          <p>
            I regret not finishing high school in a conventional way. That said, it clearly wasn’t a place where I’d excel. Over
            three decades ago, with some help from a most generous restaurateur, I set out to learn a trade. In 1984 I was a
            member of the first class at the French Culinary Institute which gave me the fundamentals I needed. My schooling, and
            a three year stint with Chef Jonathan Waxman in the mid to late ‘80’s, were the two experiences I point to most when I
            think about how I got my start. They outfitted me with the confidence I needed to take my own shot.
          </p>
          <p>
            Over the years, I’ve been able to play out my culinary dreams like an artist—approaching concepts that were speaking
            to me at that very moment. From the contemporary southwestern cuisine of Mesa Grill, to the the French-inspired
            American Brasserie menu of Bar Americain, the salty allure of Mediterranean ingredients at Bolo (and later Gato), a
            fresh approach to South Jersey Surf and Turf at Bobby Flay Steak and a kitchen of new discovery that put South
            American chiles and peppers on my paint brush and fish as my canvas at Shark in Las Vegas. Each has been a labour of
            true love and inspiration. I’m excited to see what happens next.
          </p>
        </div>
      </article>

      <div class="section-spacer section-spacer--half"></div>

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
    </section>

    <div class="section-spacer"></div>

    <SocialFeed />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtersOpen: false,
    }
  },
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

    .content {
      position: relative;
      padding: 90px 6vw 0 33%;

      @include breakpoint(small) {
        padding: 130px 6vw 0;
        text-align: center;
      }

      h1 {
        @extend .h3;

        &:before {
          position: absolute;
          top: 0;
          left: 5vw;
          content: attr(data-first-letter);
          @extend .h1;
          line-height: 0.5em;

          @include breakpoint(small) {
            top: 2vw;
            font-size: 150px;
          }
        }
      }
    }
  }
}

.about-content {
  article {
    display: flex;
    flex-direction: column;
    align-items: center;

    figure {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 0;

      .image {
        position: relative;
        width: 65.4vw;
        height: 42.3vw;
        max-height: 610px;
        min-height: 224px;
        border: 1px solid $black;

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          left: 10px;
          width: 100%;
          height: 100%;
          border: 1px solid $black;
          z-index: 0;

          @include breakpoint(medium) {
            left: -10px;
          }
        }

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }
      }
      figcaption {
        position: relative;
        left: -0.15em;
        @extend .h1;
        font-size: 600px;
        line-height: 0;
        z-index: 1;

        @include breakpoint(xlarge) {
          font-size: 41.7vw;
        }

        @include breakpoint(small) {
          font-size: 150px;
        }
      }
    }
    .content {
      margin: 0 25px;
      max-width: 915px;

      @include breakpoint(small) {
        text-align: center;
      }
    }
  }
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
