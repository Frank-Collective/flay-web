<template>
  <section class="card-grid">
    <div class="inner">
      <div class="header" v-if="headerText">
        <nuxt-link to="/portfolio" tabindex="0"
          ><h3>{{ headerText }}</h3></nuxt-link
        >
        <div class="cta" v-if="headerLink">
          <nuxt-link class="button primary" :to="headerLink.url" tabindex="0">{{ headerLink.text }}</nuxt-link>
          <nuxt-link class="button secondary" :to="headerLink.url" tabindex="0">{{ headerLink.text }}</nuxt-link>
        </div>
      </div>
      <div class="grid">
        <Card :featured="true" :bgColor="'#D8CAA5'" />
        <Card />
        <Card :bgColor="'#F9A252'" />
        <Card :bgColor="'#9E99AD'" />
        <Card :bgColor="'#D75E3E'" />
        <Card :bgColor="'#C85C5C'" />
        <Card :bgColor="'#CCB6E7'" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    headerText: null,
    headerLink: null,
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.card-grid {
  padding: 20px 10px;

  .inner {
    display: flex;
    flex-direction: column;

    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3vw;

      @include breakpoint(small) {
        flex-direction: column;
        margin: 66px 0;
      }

      h3 {
        margin-bottom: 0.3em;
      }

      .cta {
        .primary {
          display: none;

          @include breakpoint(small) {
            display: inline-block;
          }
        }
        .secondary {
          @include breakpoint(small) {
            display: none;
          }
        }
      }
    }

    .grid {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: calc(100% + 10px);
      left: -5px;

      @include breakpoint(small) {
        width: auto;
        left: auto;
      }
    }
  }
}
</style>
