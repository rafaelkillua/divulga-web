<template>
  <article class="filters">
    <h5 class="title">Pesquise uma pequena empresa perto de você</h5>
    <v-input
      class="field"
      label="Nome da empresa"
      :value="businessName"
      @input="value => $emit('update:businessName', value)"
    />
    <v-select
      class="field"
      label="Categoria"
      optionLabel="name"
      :options="categories"
      :value="selectedCategory"
      :loading="loadingCategories"
      @input="value => $emit('update:selectedCategory', value)"
      :reduce="v => v._id"
    />
    <v-select
      class="field"
      label="Estado"
      optionLabel="nome"
      :options="ufs"
      :value="selectedUf"
      :loading="loadingUfs"
      @input="value => $emit('update:selectedUf', value)"
    />
    <v-select
      class="field"
      label="Cidade"
      optionLabel="nome"
      :options="cities"
      :value="selectedCity"
      :loading="loadingCities"
      @input="value => $emit('update:selectedCity', value)"
      :disabled="!selectedUf"
    />
  </article>
</template>

<script>
import vSelect from '../components/inputs/Select'
import vInput from '../components/inputs/Input'
import { getUfs, getCities } from '../services/location'
import { getCategories } from '../services/category'

export default {
  name: 'Filters',

  components: {
    vSelect,
    vInput
  },

  props: {
    selectedUf: {
      required: true
    },
    selectedCity: {
      required: true
    },
    businessName: {
      required: true
    },
    selectedCategory: {
      required: true
    }
  },

  data: () => ({
    ufs: [],
    cities: [],
    categories: [],

    loadingUfs: true,
    loadingCities: false,
    loadingCategories: true
  }),

  mounted () {
    getUfs().then(res => {
      this.ufs = res
      this.loadingUfs = false
    })
    getCategories().then(res => {
      this.categories = res
      this.loadingCategories = false
    })
  },

  watch: {
    selectedUf (newUf) {
      if (newUf) {
        this.loadingCities = true
        getCities(newUf).then(res => {
          this.cities = res
          this.loadingCities = false
        })
      }
      this.$emit('update:selectedCity', '')
    }
  }
}
</script>

<style lang="sass" scoped>
.filters
  @apply flex justify-between items-center flex-wrap border border-gray-500 rounded-md p-4

.title
  @apply w-full font-bold mb-4

.field
  @apply w-full px-1 mt-4
  @screen md
    @apply w-1/2
  @screen lg
    @apply w-1/4 mt-0
</style>
