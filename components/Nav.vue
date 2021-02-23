<template>
  <nav class="nav">
    <div class="inner">
      <div class="logo">
        <nuxt-link to="/" tabindex="0">Bobby Flay</nuxt-link>
      </div>
      <div class="routes" v-bind:class="{ visible: mobileMenuOpen }">
        <div class="mobile-close-x-btn" v-on:click="toggleMobileMenu">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.353553" y1="0.646447" x2="12.1313" y2="12.4242" stroke="black" />
            <line x1="0.716759" y1="12.4238" x2="12.4945" y2="0.646044" stroke="black" />
          </svg>
        </div>
        <div class="search" v-bind:class="{ expanded: searchOpen }">
          <div class="search-inner">
            <div class="icon" v-on:click="toggleSearch">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.2869 7.31864C5.64049 7.76417 4.85697 8.02503 4.01252 8.02503C1.79647 8.02503 0 6.22857 0 4.01252C0 1.79647 1.79647 0 4.01252 0C6.22857 0 8.02503 1.79647 8.02503 4.01252C8.02503 4.85697 7.76417 5.64049 7.31864 6.2869L10 8.96826L8.96826 10L6.2869 7.31864ZM4.0124 6.56387C5.42262 6.56387 6.56582 5.42067 6.56582 4.01045C6.56582 2.60024 5.42262 1.45703 4.0124 1.45703C2.60219 1.45703 1.45898 2.60024 1.45898 4.01045C1.45898 5.42067 2.60219 6.56387 4.0124 6.56387Z"
                  fill="black"
                />
              </svg>
            </div>
            <input placeholder="Search" type="text" />
            <div class="close-x-btn" v-on:click="toggleSearch">
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8.42974" y1="1.35846" x2="1.35868" y2="8.42952" stroke="black" stroke-width="1.5" />
                <line x1="8.78315" y1="8.42877" x2="1.71208" y2="1.3577" stroke="black" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <ul>
          <li v-on:click="toggleMobileMenu"><nuxt-link to="/portfolio" tabindex="0">Portfolio</nuxt-link></li>
          <li v-on:click="toggleMobileMenu"><nuxt-link to="/about" tabindex="0">About</nuxt-link></li>
          <li v-on:click="toggleMobileMenu"><nuxt-link to="/shop" tabindex="0">Shop</nuxt-link></li>
          <li v-on:click="toggleMobileMenu" class="mobile-only"><nuxt-link to="/contact" tabindex="0">Contact</nuxt-link></li>
        </ul>
      </div>
      <div class="burger-btn" v-on:click="toggleMobileMenu">
        <div class="burger-btn-inner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchOpen: false,
      mobileMenuOpen: false,
      prevScrollPos: 0,
      currScrollPos: 0,
    }
  },
  computed: {
    isMobileMenuOpen() {
      if (this.mobileMenuOpen) {
        return 'mobile-menu-open'
      } else {
        return ''
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', () => this.onPageScroll())
    this.onPageScroll()
  },
  methods: {
    toggleMobileMenu: function() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu: function() {
      this.mobileMenuOpen = false
    },
    toggleSearch: function() {
      this.searchOpen = !this.searchOpen
    },
    onPageScroll() {
      this.prevScrollPos = this.currScrollPos
      this.currScrollPos = window.pageYOffset

      if (this.currScrollPos > 3) {
        this.scrolledDown = true
      } else {
        this.scrolledDown = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  max-width: 1600px;
  padding: 10px 10px 0;
  user-select: none;
  z-index: 10;

  .inner {
    border: 1px solid $black;
    background: $white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .logo {
      font-family: 'Object-Sans-Regular';
      font-weight: bold;
      font-size: 17px;
      line-height: 1;
      color: $black;

      a {
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 0.55em 0 0.35em;
      }
    }

    .routes {
      display: flex;

      @include breakpoint(small) {
        display: flex;
        display: none;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: $light-grayish-orange;

        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          left: 10px;
          width: calc(100% - 30px);
          height: calc(100% - 30px);
          border: 1px solid $black;
          background: $light-grayish-orange;
          z-index: 1;
        }

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 20px;
          left: 20px;
          width: calc(100% - 30px);
          height: calc(100% - 30px);
          border: 1px solid $black;
        }
      }

      &.visible {
        @include breakpoint(small) {
          display: flex;
        }
      }

      .mobile-close-x-btn {
        display: none;
        position: absolute;
        width: 40px;
        height: 40px;
        top: 12px;
        left: 7px;
        z-index: 1;
        cursor: pointer;
        // border: 1px solid pink;

        @include breakpoint(small) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .search {
        position: relative;
        right: 10px;
        display: flex;
        align-items: center;

        @include breakpoint(small) {
          z-index: 1;
          order: 2;
          right: auto;
          justify-content: center;
        }

        &.expanded {
          .search-inner {
            border-bottom: 1px solid $black;
            width: 250px;

            input {
              opacity: 1;
              pointer-events: all;
              visibility: visible;
            }

            .close-x-btn {
              opacity: 1;
              pointer-events: all;
              visibility: visible;
            }
          }
        }

        .search-inner {
          border-bottom: 1px solid transparent;
          display: flex;
          align-items: center;
          width: 10px;
          transition: width 0.25s, border-bottom 0.5s;

          @include breakpoint(small) {
            border-bottom: 1px solid $black;
            width: 250px;
            margin-top: 50px;
          }

          .icon {
            position: relative;

            &:after {
              content: '';
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 30px;
              height: 30px;
              // border: 1px solid black;
              cursor: pointer;
            }
          }

          input {
            flex-grow: 1;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
            -webkit-appearance: none;
            border: none;
            outline: none;
            font-family: 'Object-Sans-Regular';
            font-size: 14px;
            padding: 0 0.5em;
            transition: 0.5s opacity;
            background: transparent;

            @include breakpoint(small) {
              opacity: 1;
              pointer-events: all;
              visibility: visible;
            }

            &::placeholder {
              color: $black;
            }
          }

          .close-x-btn {
            position: relative;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;

            @include breakpoint(small) {
              opacity: 1;
              pointer-events: all;
              visibility: visible;
            }

            &:after {
              content: '';
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 30px;
              height: 30px;
              // border: 1px solid black;
              cursor: pointer;
            }
          }
        }
      }

      ul {
        position: relative;
        z-index: 1;
        background: $white;
        display: flex;

        @include breakpoint(small) {
          background: none;
          flex-direction: column;
          align-items: center;
        }

        li {
          display: flex;
          align-items: center;
          font-family: 'Object-Sans-Regular';
          font-size: 14px;
          line-height: 1;
          color: $black;
          margin-left: 38px;

          &:first-of-type {
            margin-left: 28px;

            @include breakpoint(small) {
              margin-left: 0;
            }
          }

          @include breakpoint(small) {
            font-size: 35px;
            font-weight: bold;
            margin-left: 0;
            margin-bottom: 1em;
          }

          a {
            height: 100%;
            display: flex;
            align-items: center;
            color: inherit;
            text-decoration: none;
            padding-top: 0.25em;

            &:hover,
            &.nuxt-link-active {
              font-weight: bold;
            }
          }
        }
      }
    }

    .burger-btn {
      display: none;
      align-items: center;
      cursor: pointer;

      @include breakpoint(small) {
        display: flex;
      }

      .burger-btn-inner {
        display: flex;
        flex-direction: column;
        width: 28px;

        div {
          width: 100%;
          height: 1px;
          background: $black;
          margin: 3px 0;
        }
      }
    }
  }
}
</style>
