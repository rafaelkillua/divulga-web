<template>
  <div class="navbar">
    <router-link to="/">
      <img
        class="logo"
        src="https://www.vhv.rs/dpng/d/201-2010185_thumb-image-placeholder-image-logo-svg-hd-png.png"
      />
    </router-link>
    <ul>
      <li>
        <Button type="link" to="/novo">Cadastrar meu negócio</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button'

export default {
  components: {
    Button
  }
}
</script>

<style lang="sass" scoped>

.navbar
  @apply fixed top-0 left-0 w-full shadow-sm bg-primary px-8 py-2 flex justify-between items-center

.logo
  @apply h-12

</style>
