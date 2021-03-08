<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      fade_up_els: [],
      slide_up_enter_els: [],
      slide_up_leave_els: [],
      stagger_cards_slide_up_enter_els: [],
      portfolio_featured_els: [],
      primary_header_els: [],
      about_header_els: [],
    }
  },
  mounted() {
    window.onload = event => {
      this.scrollTriggerInit()
    }
  },
  methods: {
    scrollTriggerInit() {
      console.log('scrollTriggerInit')
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

      // Portfolio Featured
      this.portfolio_featured_els = document.querySelectorAll('[data-st-portfolio-featured]')
      this.portfolio_featured_els.forEach(this.add_portfolio_featured_animation)

      // Primary Header
      this.primary_header_els = document.querySelectorAll('[data-st-primary_header]')
      this.primary_header_els.forEach(this.add_primary_header_animation)

      // About Header
      this.about_header_els = document.querySelectorAll('[data-st-about_header]')
      this.about_header_els.forEach(this.add_about_header_animation)
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
          y: -100,
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
    add_portfolio_featured_animation(el, index) {
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
    add_primary_header_animation(el, index) {
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
    add_about_header_animation(el, index) {
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
