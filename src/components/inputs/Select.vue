<template>
  <float-label :label="label" :on="isLabelActive">
    <v-select
      class="custom-select"
      :options="options"
      :label="optionLabel"
      :value="value"
      @input="v => $emit('input', v)"
      :reduce="reduce"
      :placeholder="label"
      :searchable="searchable"
      :disabled="disabled"
      :loading="loading"
      @search:focus="isFocused = true"
      @search:blur="isFocused = false"
    >
      <template v-slot:no-options="{ search, searching }">
        <template v-if="searching">
          <em>{{ search }}</em> não foi encontrado.
        </template>
        <em class="no-data" v-else>Não há opções</em>
      </template>
      <!-- <template v-slot:spinner="{ loading }">
        {{String(loading)}}
        <div class="spinner" v-show="spinner">Loading...</div>
      </template>-->
    </v-select>
  </float-label>
</template>

<script>
import vSelect from 'vue-select'
import FloatLabel from 'vue-float-label/components/FloatLabel'

export default {
  props: {
    options: {
      required: true,
      default: []
    },
    label: {
      required: true
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
    },
    optionLabel: {
      required: false,
      default: 'name'
    },
    searchable: {
      required: false,
      default: true
    },
    disabled: {
      required: false,
      default: false
    },
    loading: {
      required: false,
      default: false
    }
  },
  components: {
    vSelect,
    FloatLabel
  },
  data: () => ({
    isFocused: false
  }),
  computed: {
    isLabelActive () {
      return this.isFocused || !!this.value
    }
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

.vfl-label
  @apply px-2 text-primary
</style>

<style lang="sass" scoped>
.no-data
  @apply opacity-50
</style>
