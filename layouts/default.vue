<template>
  <div class="page-wrapper">
    <Nav />
    <div class="page-content">
      <div class="inner">
        <Nuxt />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * // For Smooth Scroll, uncomment below. Also in `global.scss` there are a couple things to uncomment.
 */

// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)
// import Scrollbar from 'smooth-scrollbar'

export default {
  mounted() {
    // Uncomment for Smooth Scroll
    // const scroller = document.querySelector('.page-content')
    // const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true })
    // ScrollTrigger.scrollerProxy('.page-content', {
    //   scrollTop(value) {
    //     if (arguments.length) {
    //       bodyScrollBar.scrollTop = value
    //     }
    //     return bodyScrollBar.scrollTop
    //   },
    // })
    // bodyScrollBar.addListener(ScrollTrigger.update)
    // ScrollTrigger.defaults({ scroller: scroller })
    // END Uncomment for Smooth Scroll
  },
}
</script>

<style lang="scss">
.page-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0 auto;

  .page-content {
    flex-grow: 1;
    width: 100%;

    // Uncomment for Smooth Scroll
    // height: 100vh;
    // END Uncomment for Smooth Scroll

    .inner {
      margin: 0 auto;
      max-width: 1600px;
    }

    .scrollbar-track {
      // background: rgba(255, 255, 255, 1);
      background: transparent;
      width: 15px;
      // border-left: 1px solid #e8e8e8;

      @include breakpoint(small) {
        display: none !important;
      }

      .scrollbar-thumb {
        left: 3px;
        background: transparent;

        &:after {
          content: '';
          position: absolute;
          top: 3px;
          width: 100%;
          height: calc(100% - 8px);
          background: #c1c1c1;
          border-radius: inherit;
        }

        &:hover {
          &:after {
            background: #7d7d7d;
          }
        }
      }
    }
  }
}
</style>
