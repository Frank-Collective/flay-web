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
      stagger_cards_slide_up_enter_els: [],
      animate_in_class_els: [],
    }
  },
  mounted() {
    // console.log('ScrollTriggerHub mounted')
    // document.addEventListener('DOMContentLoaded', () => {
    this.scrollTriggerInit()
    // })
  },
  updated() {
    // console.log('ScrollTriggerHub updated')
    this.scrollTriggerInit()
  },
  methods: {
    scrollTriggerInit() {
      if (!this.scrolltrigger_initiated && process.client) {
        // console.log('scrollTriggerInit')
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

        // Stagger Cards Slide Up Enter
        this.stagger_cards_slide_up_enter_els = document.querySelectorAll('[data-st-stagger_cards_slide_up_enter]')
        this.stagger_cards_slide_up_enter_els.forEach(this.add_stagger_cards_slide_up_enter_animation)

        // Animate In Class elements
        this.animate_in_class_els = document.querySelectorAll('[data-st-animate_in_class]')
        this.animate_in_class_els.forEach(this.toggle_animate_in_class)
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
    add_stagger_cards_slide_up_enter_animation(el, index) {
      let cards = el.querySelectorAll('.card')
      cards.forEach((card, index) => {
        const timeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 105%',
              end: 'top 95%',
              scrub: 1,
            },
          })
          .from(card, {
            y: 100,
            scale: 0.97,
          })
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
  },
}
</script>
