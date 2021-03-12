<template>
  <section class="page-builder" v-if="content_blocks">
    <div v-for="(block, index) in content_blocks" :key="index">
      <!-- Boxed Content -->
      <article
        v-if="block.fieldGroupName == `${type}_Pagebuilder_ContentBlocks_BoxedContent`"
        class="boxed-content"
        data-st-fade_up
      >
        <div class="inner" v-html="block.textEditor" data-st-slide_up_leave></div>
      </article>

      <article
        v-if="block.fieldGroupName == `${type}_Pagebuilder_ContentBlocks_ContentWLargeImageHeader`"
        class="content-with-large-image-header"
        data-st-fade_up
      >
        <figure data-st-slide_up_leave>
          <div class="image">
            <FadeImage
              v-if="block.image"
              :srcset="block.image.srcSet"
              :sizes="block.image.sizes"
              :src="block.image.mediaItemUrl"
              :alt="block.image.altText"
            />
          </div>
          <figcaption>{{ block.textEditor.substr(4, 1) }}</figcaption>
        </figure>
        <div class="section-spacer"></div>
        <div class="content" data-st-fade_up><div class="inner" v-html="block.textEditor" data-st-slide_up_leave></div></div>
      </article>

      <blockquote v-if="block.fieldGroupName == `${type}_Pagebuilder_ContentBlocks_Quote`" class="quote" data-st-fade_up>
        <p data-st-slide_up_leave>{{ block.text }}</p>
      </blockquote>

      <article v-if="block.fieldGroupName == `${type}_Pagebuilder_ContentBlocks_Image`" class="full-width-image" data-st-fade_up>
        <div data-st-slide_up_leave>
          <FadeImage
            v-if="block.image"
            :srcset="block.image.srcSet"
            :sizes="block.image.sizes"
            :src="block.image.mediaItemUrl"
            :alt="block.image.altText"
          />
        </div>
      </article>

      <article
        v-if="block.fieldGroupName == `${type}_Pagebuilder_ContentBlocks_TextContent`"
        class="text-content"
        data-st-fade_up
      >
        <div v-html="block.textEditor" data-st-slide_up_leave></div>
      </article>

      <div class="section-spacer"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content_blocks: null,
    type: null,
  },
  mounted() {
    // console.log(this.content_blocks)
  },
}
</script>

<style lang="scss" scoped>
.page-builder {
  .boxed-content {
    .inner {
      position: relative;
      border: 1px solid $black;
      margin: 0 10vw;
      padding: 6vw 10vw;

      @include breakpoint(small) {
        text-align: center;
        margin: 0 20px 0 10px;
        padding: 50px 40px 20px;
      }

      &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        border: 1px solid $black;
        top: -10px;
        left: 10px;

        @include breakpoint(small) {
          top: 10px;
        }
      }
    }
  }

  .content-with-large-image-header {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include breakpoint(small) {
      align-items: flex-start;
    }

    figure {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 0;
      width: 100%;

      @include breakpoint(small) {
        flex-direction: column;
        align-items: flex-start;
        width: calc(100% - 10px);
        margin-bottom: 70px;
      }

      .image {
        position: relative;
        width: 65.4vw;
        height: 42.3vw;
        max-height: 610px;
        min-height: 224px;
        border: 1px solid $black;

        @include breakpoint(small) {
          width: 100%;
        }

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
          left: 65%;
        }
      }
    }

    .content {
      margin: 0 18vw;

      @include breakpoint(small) {
        text-align: center;
        margin: 0 25px;
      }
    }
  }

  .quote {
    display: flex;
    width: 100%;
    max-width: 1035px;
    margin: 60px auto;
    padding: 0 10px;

    @include breakpoint(medium) {
      flex-direction: column;
    }

    &:before {
      content: '';
      position: relative;
      display: block;
      flex-shrink: 0;
      width: 244px;
      height: 197px;
      background-image: url('/images/quotes.png');
      background-size: 100%;
      background-repeat: no-repeat;

      @include breakpoint(medium) {
        left: -37px;
        width: 172px;
        height: 139px;
      }
    }

    p {
      @extend .h3;
      margin: 1.7em 0 0 70px;

      @include breakpoint(medium) {
        margin: 1.3em 0 0 0;
        text-align: center;
      }
    }
  }

  .full-width-image {
    width: 100%;
    max-width: 915px;
    margin: 0 auto;
    padding: 0 10px;

    img {
      display: block;
      width: 100%;
      height: auto;
      border: 1px solid $black;
    }
  }

  .text-content {
    margin: 0 18vw;

    @include breakpoint(small) {
      text-align: center;
      margin: 0 25px;
    }
  }
}
</style>
