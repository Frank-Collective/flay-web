<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      fade_up_els: [],
    }
  },
  mounted() {
    // this.scrollTriggerInit()
  },
  updated() {
    // this.scrollTriggerInit()
  },
  methods: {
    scrollTriggerInit() {
      // Fade In & Slide Up
      this.fade_up_els = document.querySelectorAll('[data-st="fade_up"]')
      this.fade_up_els.forEach(this.add_fade_up_animation)
    },
    add_fade_up_animation(el, index) {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            ease: 'power2',
            toggleActions: 'play none none reverse',
          },
        })
        .from(el, {
          y: 100,
          opacity: 0,
          duration: 2,
        })
    },
    checkForDisableMobile(el) {
      // var windowWidth = window.innerWidth
      // var disableMobile = el.classList.contains('sr-disable-mobile')
      // if (disableMobile && windowWidth < 768) {
      //   return true
      // }
    },
  },
}
</script>
