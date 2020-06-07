<template>
  <validation-provider v-if="!!rules" v-slot="v" :rules="rules" mode="eager">
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
      </v-select>
    </float-label>
    <span class="error">{{ v.errors[0] }}</span>
  </validation-provider>
  <float-label v-else :label="label" :on="isLabelActive">
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
    </v-select>
  </float-label>
</template>

<script>
import vSelect from 'vue-select'
import FloatLabel from 'vue-float-label/components/FloatLabel'
import { ValidationProvider } from 'vee-validate'

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
    },
    rules: {
      required: false
    }
  },
  components: {
    vSelect,
    FloatLabel,
    ValidationProvider
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
@import url('https://unpkg.com/vue-select@latest/dist/vue-select.css')
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

.error
  @apply absolute text-xs text-red-700
</style>
