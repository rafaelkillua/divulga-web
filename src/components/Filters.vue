<template>
  <div class="filters">
    <v-input
      class="field"
      label="Nome da empresa"
      :value="businessName"
      @input="value => $emit('update:businessName', value)"
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
  </div>
</template>

<script>
import vSelect from '../components/inputs/Select'
import vInput from '../components/inputs/Input'
import { getUfs, getCities } from '../services/location'

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
    }
  },

  data: () => ({
    ufs: [],
    cities: [],

    loadingUfs: true,
    loadingCities: false
  }),

  mounted () {
    getUfs().then(res => {
      this.ufs = res
      this.loadingUfs = false
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
  @apply flex justify-between items-center flex-wrap

.field
  @apply w-1/3 px-1
</style>
