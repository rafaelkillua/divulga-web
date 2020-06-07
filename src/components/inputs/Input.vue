<template>
  <validation-provider v-if="!!rules" v-slot="v" :rules="rules" mode="eager">
    <float-label>
      <input
        class="input"
        :placeholder="label"
        @input="evt => $emit('input', evt.target.value)"
        :value="value"
        :type="type"
      />
    </float-label>
    <span class="error">{{ v.errors[0] }}</span>
  </validation-provider>
  <float-label v-else>
    <input
      class="input"
      :placeholder="label"
      @input="evt => $emit('input', evt.target.value)"
      :value="value"
      :type="type"
    />
  </float-label>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
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
    },
    type: {
      required: false,
      default: 'text'
    },
    rules: {
      required: false
    }
  },

  components: {
    FloatLabel,
    ValidationProvider
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

.error
  @apply absolute text-xs text-red-700
</style>
