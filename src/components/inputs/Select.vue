<template>
  <v-select class="custom-select" :options="options" :label="label" :value="value" @input="v => $emit('input', v)" :reduce="reduce" :placeholder="placeholder">
    <template v-slot:no-options="{ search, searching }">
      <template v-if="searching">
        <em>{{ search }}</em> não foi encontrado.
      </template>
      <em class="no-data" v-else>Não há opções</em>
    </template>
  </v-select>
</template>

<script>
import vSelect from 'vue-select'

export default {
  props: {
    options: {
      required: true,
      default: []
    },
    label: {
      required: false,
      default: 'name'
    },
    value: {
      required: true,
      default: ''
    },
    reduce: {
      type: Function,
      required: false,
      default: v => v.id
    },
    placeholder: {
      required: false,
      default: 'Selecione...'
    }
  },
  components: {
    vSelect
  }
}
</script>

<style lang="sass">
@import "vue-select/src/scss/vue-select.scss"
.custom-select
  @apply h-10
  .vs__dropdown-toggle
    @apply h-full border-gray-400 rounded-md
  .vs__search::placeholder
    @apply text-gray-500
</style>

<style lang="sass" scoped>

.no-data
  @apply opacity-50
</style>
