<template>
  <div class="filters">
    <v-input class="field" v-model="businessName" label="Nome da empresa" />
    <v-select class="field" :options="ufs" v-model="selectedUf" label="nome"></v-select>
    <v-select class="field" :options="cities" v-model="selectedCity" label="nome"></v-select>
  </div>
</template>

<script>
import vSelect from '../components/inputs/Select'
import vInput from '../components/inputs/Input'
import { getUfs, getCities } from '../services/location'

export default {
  components: {
    vSelect,
    vInput
  },

  data: () => ({
    ufs: [],
    cities: [],
    selectedUf: '',
    selectedCity: '',
    businessName: ''
  }),

  mounted () {
    getUfs().then(res => (this.ufs = res))
  },

  watch: {
    selectedUf (newUf) {
      getCities(newUf).then(res => {
        this.cities = res
        this.selectedCity = ''
      })
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
