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
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .page-content {
    flex-grow: 1;
  }
}
</style>
