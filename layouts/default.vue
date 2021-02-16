<template>
  <div class="page-wrapper">
    <Nav />
    <div class="page-content">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
.page-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1600px;

  .page-content {
    flex-grow: 1;
  }
}
</style>
