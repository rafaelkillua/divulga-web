<template>
  <div>
    <section class="home">
      <h2 class="title">Bem vindos ao Divulga, onde empresas pequenas têm nome!</h2>
    </section>
    <section>
      <filters
        :businessName.sync="businessName"
        :selectedCategory.sync="selectedCategory"
        :selectedUf.sync="selectedUf"
        :selectedCity.sync="selectedCity"
      />
    </section>
    <section>
      <button @click="getBusiness">teste</button>
      {{ JSON.stringify(business) }}
    </section>
  </div>
</template>

<script>
import Filters from '@/components/Filters'
import { getBusiness } from '@/services/business'

export default {
  name: 'Home',

  components: {
    Filters
  },

  data: () => ({
    business: [],

    businessName: '',
    selectedCategory: '',
    selectedUf: '',
    selectedCity: ''
  }),

  methods: {
    getBusiness () {
      const params = {
        name: this.businessName,
        category: this.selectedCategory,
        uf_id: this.selectedUf,
        city_id: this.selectedCity
      }
      getBusiness(params).then(res => {
        this.business = res
      }).catch(error => console.error(error))
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  @apply text-xl font-bold text-center

.home
  @apply mb-8
</style>
