<template>
  <div class="navbar-wrapper">
    <div class="backdrop" v-if="showMobile" @click="showMobile = false" />
    <transition name="slide-down">
      <ul class="dropdown" v-if="showMobile" @click="showMobile = false">
        <li class="dropdown-item">
          <router-link to="/">Empresas</router-link>
        </li>
        <li class="dropdown-item">
          <router-link to="/cadastrar">Cadastrar minha empresa</router-link>
        </li>
        <li class="dropdown-item">
          <router-link to="/quem-somos">Quem somos</router-link>
        </li>
      </ul>
    </transition>
    <div class="container navbar">
      <router-link to="/">
        <img
          class="logo"
          src="https://www.vhv.rs/dpng/d/201-2010185_thumb-image-placeholder-image-logo-svg-hd-png.png"
          @click="showMobile = false"
        />
      </router-link>
      <ul class="nav">
        <li>
          <router-link class="link" to="/">Empresas</router-link>
        </li>
        <li>
          <router-link class="link" to="/cadastrar">Cadastrar minha empresa</router-link>
        </li>
        <li>
          <router-link class="link" to="/quem-somos">Quem somos</router-link>
        </li>
      </ul>
      <menu-icon class="menu-toggle" @click="showMobile = !showMobile" />
    </div>
  </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu'
export default {
  components: {
    MenuIcon
  },

  data: () => ({
    showMobile: false
  })
}
</script>

<style lang="sass" scoped>
.navbar-wrapper
  @apply fixed top-0 left-0 w-full shadow-lg bg-primary flex items-center justify-center z-10
  @screen md
    @apply w-full justify-center

.navbar
  @apply w-full px-8 py-2 flex justify-between items-center
  @screen md
    @apply justify-between

.logo
  @apply h-12

.nav
  @apply hidden
  @screen md
    @apply flex

.menu-toggle
  @apply cursor-pointer text-white
  @screen md
    @apply hidden

.link
  @apply font-bold ml-4 text-white
  &:hover
    @apply text-gray-300
  &:active
    @apply text-gray-500

.backdrop
  @apply fixed w-screen h-screen top-0 left-0 bg-transparent opacity-75

.dropdown
  top: 4rem
  @apply absolute w-full bg-white shadow-lg
  &-item
    @apply w-full flex border-b-2 py-1
    &:first-of-type
      @apply border-t-2
    &:hover
      @apply bg-gray-200
    &:active
      @apply bg-gray-400
    &> a
      @apply w-full h-full

.slide-down-enter-active, .slide-down-leave-active
  transition: all .3s

.slide-down-enter, .slide-down-leave-to
  @apply top-0 opacity-0

</style>
