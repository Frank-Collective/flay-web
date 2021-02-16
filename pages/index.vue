<template>
  <div>
    <PrimaryHeader
      :image="'/images/BFtuscany.jpg'"
      :bigLetter="'B'"
      :header="'Food is the center of my universe'"
      :content="
        'First and foremost, my most comfortable place is in my kitchens—at my restaurants or at home. I don an apron (my shield from the tough moments of the world) on it are remnants of my creations—both good and somewhat experimental. It reminds me that I’m not afraid to fail as long as I make every effort to succeed.'
      "
      :link="{ text: 'My Story', url: '/about' }"
    />
    <CardGrid :headerText="'Portfolio'" :headerLink="{ text: 'View All', url: '/portfolio' }" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
