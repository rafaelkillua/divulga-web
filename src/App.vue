<template>
  <div class="main">
    <div class="container">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap')

body
  font-family: 'Open Sans', sans-serif

.main
  min-height: calc(100vh - 4rem)
  @apply mt-16 flex justify-center px-8 py-4

</style>
