<template>
  <router-link v-if="type === 'link'" class="button" :to="to" >
    <slot />
  </router-link>
  <button v-else class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: String
  }
}
</script>

<style lang="sass">

.button
  @apply px-4 py-2 bg-white rounded-sm
  &:hover
    @apply bg-gray-100
  &:active
    @apply bg-gray-200

</style>
