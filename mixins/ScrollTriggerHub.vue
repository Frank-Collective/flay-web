<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      scrolltrigger_initiated: false,
      fade_up_els: [],
      slide_up_enter_els: [],
      slide_up_leave_els: [],
      animate_in_class_els: [],
      primary_header_el: [],
    }
  },
  mounted() {
    // console.log('ScrollTriggerHub mounted')
  },
  updated() {
    // console.log('ScrollTriggerHub updated')
    // this.scrollTriggerInit()
  },
  activated() {
    console.log('ScrollTriggerHub.vue ACTIVATED')
    this.scrollTriggerInit()
  },
  deactivated() {
    console.log('ScrollTriggerHub.vue DE-ACTIVATED')
  },
  methods: {
    scrollTriggerInit() {
      if (!this.scrolltrigger_initiated && process.client) {
        console.log('scrollTriggerInit ============================================================== scrollTriggerInit')
        this.scrolltrigger_initiated = true

        // Fade In & Slide Up
        this.fade_up_els = document.querySelectorAll('[data-st-fade_up]')
        this.fade_up_els.forEach(this.add_fade_up_animation)

        // Slide Up Enter
        this.slide_up_enter_els = document.querySelectorAll('[data-st-slide_up_enter]')
        this.slide_up_enter_els.forEach(this.add_slide_up_enter_animation)

        // Slide Up Leave
        this.slide_up_leave_els = document.querySelectorAll('[data-st-slide_up_leave]')
        this.slide_up_leave_els.forEach(this.add_slide_up_leave_animation)

        // Animate In Class elements
        this.animate_in_class_els = document.querySelectorAll('[data-st-animate_in_class]')
        this.animate_in_class_els.forEach(this.toggle_animate_in_class)

        // Primary Header
        this.primary_header_el = document.querySelectorAll('[data-st-primary_header]')
        // this.primary_header_el.forEach(this.add_primary_header_animation)
        if (this.primary_header_el.length) {
          this.add_primary_header_animation(this.primary_header_el)
        }
      }
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
          y: 50,
          opacity: 0,
          duration: 2,
        })
    },
    add_slide_up_enter_animation(el, index) {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top center',
            scrub: 1,
          },
        })
        .from(el, {
          y: 100,
        })
    },
    add_slide_up_leave_animation(el, index) {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'bottom 40%',
            end: 'bottom 0px',
            scrub: 1,
          },
        })
        .to(el, {
          y: -50,
          scale: 0.95,
          opacity: 0,
        })
    },
    toggle_animate_in_class(el, index) {
      const timeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          toggleClass: { targets: el, className: 'animate-in' },
          // onEnter: () => {
          //   el.classList.add('animate-in')
          // },
        },
      })
    },
    add_primary_header_animation(element) {
      let el = element[0]
      let image = el.querySelector('.image')
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            ease: 'power2',
            toggleActions: 'play restart none reverse',
          },
        })
        .to(el, {
          opacity: 1,
          duration: 1,
        })
        .to(
          image,
          {
            x: 0,
            duration: 3,
          },
          '-1'
        )
    },
  },
}
</script>
