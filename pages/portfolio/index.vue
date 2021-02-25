<template>
  <div>
    <header class="featured">
      <div class="inner">
        <article class="portfolio-piece">
          <div class="image">
            <img src="/images/amalfi_ba_lounge.jpg" alt="" />
            <span class="number">1</span>
          </div>
          <div class="content">
            <h3>Amalfi</h3>
            <p>I’m so excited to bring the best of Italian coastal cuisine to Caesars Palace.</p>
            <div class="cta">
              <nuxt-link to="/portfolio/example" class="button primary">Explore</nuxt-link>
            </div>
          </div>
        </article>
        <article class="portfolio-piece reversed">
          <div class="image">
            <img src="/images/Spread.jpg" alt="" />
            <span class="number">2</span>
          </div>
          <div class="content">
            <h3>Misfits Market</h3>
            <p>There's no limit to what you can create with the organic produce and pantry staples from Misfits Market.</p>
            <div class="cta">
              <nuxt-link to="#" class="button primary">Get Inspired</nuxt-link>
            </div>
          </div>
        </article>
        <article class="portfolio-piece">
          <div class="image">
            <img src="/images/Nacho_Treats_Food_Pouch_F&B_Turkey.png" alt="" />
            <span class="number">3</span>
          </div>
          <div class="content">
            <h3>Made by Nacho</h3>
            <p>I love my cats, so of course I created a cat food in their honor.</p>
            <div class="cta">
              <nuxt-link to="#" class="button primary">Coming Soon</nuxt-link>
            </div>
          </div>
        </article>
      </div>
    </header>
    <section class="portfolio-grid">
      <div class="inner">
        <div class="filters">
          <ul v-bind:class="{ open: filtersOpen }">
            <li>All</li>
            <li>Restaurants</li>
            <li>TV</li>
            <li>Ventures</li>
          </ul>
          <div class="toggler">
            <span>All</span>
            <div class="toggle-btn" v-on:click="toggleFiltersMenu">
              <div></div>
              <div v-bind:style="{ opacity: filtersOpen ? '0' : '1' }"></div>
            </div>
          </div>
        </div>
        <div class="grid">
          <Card :bgColor="'#F9A252'" />
          <Card :bgColor="'#9E99AD'" />
          <Card :bgColor="'#D75E3E'" />
          <Card :bgColor="'#C85C5C'" />
          <Card :bgColor="'#CCB6E7'" />
          <Card :bgColor="'#F9A252'" />
          <Card :bgColor="'#9E99AD'" />
          <Card :bgColor="'#D75E3E'" />
          <Card :bgColor="'#C85C5C'" />
        </div>
      </div>
    </section>
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
.featured {
  padding: 44px 10px 0;
  overflow: hidden;

  .inner {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0;

    article.portfolio-piece {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

      @include breakpoint(small) {
        flex-direction: column;
      }

      .image {
        position: relative;
        width: 67%;
        flex-shrink: 0;
        border: 1px solid $black;
        box-sizing: border-box;

        @include breakpoint(small) {
          width: 100%;
        }

        img {
          display: block;
          width: 100%;
          height: auto;
        }

        .number {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(40%, -0.15em);
          @extend .h1;
          line-height: 0;

          @include breakpoint(small) {
            right: auto;
            top: 100%;
            transform: translate(-0.15em, -0.05em);
          }
        }
      }

      .content {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px 3vw 30px 7vw;

        @include breakpoint(medium) {
          padding: 30px 25px 30px 7vw;
        }

        @include breakpoint(small) {
          padding: 60px 0 50px;
          align-items: center;
          text-align: center;

          h3 {
            margin-bottom: 0.3em;
          }
        }
      }

      &.reversed {
        .image {
          order: 1;

          @include breakpoint(small) {
            order: unset;
          }

          .number {
            top: 50%;
            right: auto;
            left: 0;
            transform: translate(-40%, -0.55em);

            @include breakpoint(small) {
              left: auto;
              right: 0;
              top: 100%;
              transform: translate(40%, -0.1em);
            }
          }
        }

        .content {
          padding: 30px 5vw 30px 6vw;

          @include breakpoint(medium) {
            padding: 30px 5vw 30px 25px;
          }

          @include breakpoint(small) {
            padding: 60px 0 50px;
          }

          h3 {
            padding-right: 5vw;
          }
        }
      }
    }
  }
}

.portfolio-grid {
  padding: 0 10px;

  @include breakpoint(small) {
    padding-bottom: 0;
  }

  .inner {
    display: flex;
    flex-direction: column;

    .grid {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: calc(100% + 10px);
      left: -5px;
      padding-bottom: 5px;

      @include breakpoint(small) {
        width: auto;
        left: auto;
      }
    }
  }
}
</style>
