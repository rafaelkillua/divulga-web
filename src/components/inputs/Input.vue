<template>
  <float-label>
    <input
      class="input"
      :placeholder="label"
      @input="evt => $emit('input', evt.target.value)"
      :value="value"
    />
  </float-label>
</template>

<script>
import FloatLabel from 'vue-float-label/components/FloatLabel'

export default {
  props: {
    label: {
      required: true,
      default: 'Digite'
    },
    value: {
      required: true,
      default: ''
    }
  },

  components: {
    FloatLabel
  }
}
</script>

<style lang="sass">
.vfl-label
  @apply px-2 text-primary
</style>

<style lang="sass" scoped>
.input
  @apply w-full h-10 border border-gray-400 px-4 rounded-md flex items-center
  &::placeholder
    @apply text-gray-500
</style>
