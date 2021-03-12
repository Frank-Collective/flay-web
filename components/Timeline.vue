<template>
  <div class="timeline-wrapper" v-if="timelineData" data-st-slide_up_enter>
    <div class="inner" data-st-slide_up_leave>
      <div class="filters">
        <ul v-bind:class="{ open: filtersOpen }">
          <li v-on:click="filterTimeline('')" v-bind:class="{ active: selectedCat == '' }">All</li>
          <li
            v-for="(data, index) in timelineData.eventsFilters"
            :key="index"
            v-on:click="filterTimeline(data)"
            v-bind:class="{ active: selectedCat.slug == data.slug }"
          >
            {{ data.name }}
          </li>
        </ul>
        <div class="toggler">
          <span v-html="selectedCat == '' ? 'All' : selectedCat.name"></span>
          <div class="toggle-btn" v-on:click="toggleFiltersMenu">
            <div></div>
            <div v-bind:style="{ opacity: filtersOpen ? '0' : '1' }"></div>
          </div>
        </div>
      </div>

      <div class="timeline">
        <div class="images">
          <FadeImage
            v-if="timelineData.defaultImage"
            :srcset="timelineData.defaultImage.srcSet"
            :sizes="timelineData.defaultImage.sizes"
            :src="timelineData.defaultImage.mediaItemUrl"
            :alt="timelineData.defaultImage.altText"
          />
          <template v-for="data in timelineData.yearOfEvents">
            <template v-for="event in data.events">
              <img
                v-if="event.featuredImage != null"
                :key="event.id"
                :src="event.featuredImage.node.mediaItemUrl"
                alt=""
                v-bind:class="{ visible: event.id == rolloverImageID }"
              />
            </template>
          </template>
        </div>
        <div class="content black-scrollbar" ref="eventsListWrapper">
          <ol v-if="eventsList" ref="eventsList">
            <li
              v-for="(data, index) in computedEventsList"
              :key="index"
              v-on:mouseover="showImage(data.event)"
              v-on:mouseout="hideImage"
              v-bind:class="{ has_image: data.event.featuredImage }"
            >
              <span class="date">{{ data.eventYear }}</span>
              {{ data.event.title }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    timelineData: Object,
  },
  data() {
    return {
      filtersOpen: false,
      eventsImages: Array,
      eventsList: [],
      rolloverImageID: null,
      selectedCat: '',
    }
  },
  mounted() {
    if (this.timelineData) {
      // Make a single list of events from this double-nested heap of data
      for (let year in this.timelineData.yearOfEvents) {
        let theYear = this.timelineData.yearOfEvents[year].year
        let theEvents = this.timelineData.yearOfEvents[year].events
        for (let event in theEvents) {
          this.eventsList.push({ event: theEvents[event], eventYear: theYear })
        }
      }
      // console.log(this.eventsList)
    }
  },
  updated() {},
  computed: {
    computedEventsList() {
      // Show all
      if (this.selectedCat == '') {
        return this.eventsList
      }

      // Filter Events List
      let that = this
      return this.eventsList.filter(item => {
        for (let cat in item.event.categories.edges) {
          if (item.event.categories.edges[cat].node.slug == that.selectedCat.slug) {
            return true
          }
        }
      })
    },
  },
  methods: {
    toggleFiltersMenu() {
      this.filtersOpen = !this.filtersOpen
    },
    filterTimeline(cat) {
      this.filtersOpen = false

      gsap.to(this.$refs.eventsList, 0.25, {
        opacity: 0,
        y: 5,
        onComplete: () => {
          this.selectedCat = cat

          this.$refs.eventsListWrapper.scrollTo(0, top)

          gsap.to(this.$refs.eventsList, 0.25, { opacity: 1, y: 0 })
        },
      })
    },
    showImage(event) {
      this.rolloverImageID = event.id
    },
    hideImage() {
      this.rolloverImageID = null
    },
  },
}
</script>
<style lang="scss" scoped>
.timeline-wrapper {
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
          opacity: 0;
          transition: 0.1s opacity;

          &.visible {
            opacity: 1;
          }
        }
      }

      .content {
        border: 1px solid $black;
        width: calc(50% - 5px);
        flex-shrink: 0;
        padding: 40px 0;

        @include breakpoint(small) {
          width: 100%;
          border-top: 0;
          overflow-y: visible;
          padding: 30px 0;
        }

        ol {
          li {
            font-size: 30px;
            line-height: 1;
            margin-bottom: 1em;
            padding: 10px 50px;

            @include breakpoint(small) {
              padding: 10px 40px;
            }

            &.has_image {
              cursor: pointer;

              &:hover {
                opacity: 0.5;
              }
            }

            span {
              display: block;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 0.5em;
              pointer-events: none;
            }
          }
        }
      }
    }
  }
}
</style>
