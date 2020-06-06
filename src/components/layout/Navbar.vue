<template>
  <div class="navbar-wrapper">
    <div class="container navbar">
      <router-link to="/">
        <img
          class="logo"
          src="https://www.vhv.rs/dpng/d/201-2010185_thumb-image-placeholder-image-logo-svg-hd-png.png"
        />
      </router-link>
      <ul>
        <li>
          <router-link class="link" type="link" to="/">Empresas</router-link>
          <router-link class="link" type="link" to="/cadastrar">Cadastrar minha empresa</router-link>
          <router-link class="link" type="link" to="/quem-somos">Quem somos</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.navbar
  @apply px-8 py-2 flex justify-between items-center

.navbar-wrapper
  @apply fixed top-0 left-0 w-full shadow-lg bg-primary flex items-center justify-center z-50

.logo
  @apply h-12

.link
  @apply font-bold ml-4 text-white
  &:hover
    @apply text-gray-300
  &:active
    @apply text-gray-500
</style>
