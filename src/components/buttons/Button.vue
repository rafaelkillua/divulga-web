<template>
  <router-link v-if="type === 'link'" class="button" :to="to" >
    <div class="vs__spinner" v-if="loading"/>
    <slot v-else/>
  </router-link>
  <button v-else class="button" @click="$emit('click')">
    <div class="vs__spinner" v-if="loading"/>
    <slot v-else/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
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
  &> .vs__spinner
    @apply opacity-100

</style>
